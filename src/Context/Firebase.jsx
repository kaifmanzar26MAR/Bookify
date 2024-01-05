import {createContext,useContext} from 'react';
import { initializeApp } from "firebase/app";
import React,{ useState,useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
  
} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc, getDoc,query,where} from 'firebase/firestore'
import { getStorage , ref, uploadBytes,getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';


const FirebaseContext=createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBcEiSv6FmNdLkJe_d1iywNWInKnHxJjNc",
  authDomain: "bookefy-b9eec.firebaseapp.com",
  projectId: "bookefy-b9eec",
  storageBucket: "bookefy-b9eec.appspot.com",
  messagingSenderId: "565211073177",
  appId: "1:565211073177:web:899961d48a3458cd93c608"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore=getFirestore(firebaseApp);
const firebaseAuth=getAuth(firebaseApp);
const googleprovider=new GoogleAuthProvider();
const storage=getStorage(firebaseApp);

export const useFirebase=()=>useContext(FirebaseContext);
export const FirebaseProvider=(props)=>{

  const signupuserwithemailandpasswor=(email,password)=>{createUserWithEmailAndPassword(firebaseAuth,email,password).then(()=>alert("Account Created")).catch((error)=>{alert(error.message)})};
  const signinuserwithemailandpasswor=(email,password)=>{signInWithEmailAndPassword(firebaseAuth,email,password).then(()=>{return "fine"}).catch((error)=>{alert("hi"+error.message)})};
  const siginwithgoogle=()=>signInWithPopup(firebaseAuth,googleprovider);

  const [userdata,setUserdata]=useState(null);
  const isLogedin= userdata? true :false;
  const handlecreatenewlisting=async (bookname,bookid,bookimage,price)=>{
    console.log(bookimage);
    console.log(bookimage.name);
    const imageRef=ref(storage,`uploads/images/${Date.now()}-${bookimage.name}`)
    const uploadresult= await uploadBytes(imageRef,bookimage);
    console.log(uploadresult.ref.fullPath);
    return await addDoc(collection(firestore,'books'),{
      bookname,bookid,price,
      bookimage:bookimage.name,
      imageUrl:uploadresult.ref.fullPath,
      userId: userdata.uid,
      userEmail:userdata.email,
      displayName:userdata.displayName,
      photoURL:userdata.photoURL,
     
    })
  }

  const listallbooks=()=>{
    return getDocs(collection(firestore,'books'));
  };

  const getImageUrl=async (path)=>{
    try{
      const url=await getDownloadURL(ref(storage,path));
      return url;
    }catch(error){
      console.log("error in image fatching ");
      return null;
    }
  }

  const getBookById=async (id)=>{
    const docRef=doc(firestore,'books',id);
    const result=await getDoc(docRef);
    return result;
  }

  const placeOrder=async(bookid,quantity)=>{
    const collectionRef=collection(firestore,'books',bookid,'orders');
    const result=await addDoc(collectionRef,{
      userId: userdata.uid,
      userEmail:userdata.email,
      displayName:userdata.displayName,
      photoURL:userdata.photoURL,
      quantity:Number(quantity),
    });
    return result;
  }

  const fetchMyOrders = async (userId) => {
    
    console.log(userId); // Should not be undefined here
  
    if(!userId) return null;
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", '==', userId));
    const result = await getDocs(q);
    console.log(result);
    return result;


  };

  const getOrders=async (bookID)=>{
    const collectionRef=collection(firestore,"books",bookID,"orders");
    const result=await getDocs(collectionRef);
    return result;
  }

  const logout=()=>{
    signOut(firebaseAuth).then(()=>{
      console.log("signOut seccesse");
      alert("User Logout");
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,user=>{
      if(user){
        setUserdata(user);
      }else{
        setUserdata(null);
      }
    })
  },[]);
  
  return <FirebaseContext.Provider value={{
    siginwithgoogle,
    signupuserwithemailandpasswor,
    signinuserwithemailandpasswor,
    isLogedin,
    handlecreatenewlisting,
    listallbooks,
    getImageUrl,
    getBookById,
    placeOrder,
    fetchMyOrders,
    userdata,
    getOrders,
    logout
    }}>
          {props.children}
        </FirebaseContext.Provider>
};




