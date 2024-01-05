import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../Context/Firebase';
import Form from 'react-bootstrap/Form'
const ViewBook = () => {
    const {id}=useParams();
    const bookID=id.slice(1);
    console.log(bookID);
    const firebase=useFirebase();
    const [book,setBook]=useState("");
    const [url,setUrl]=useState(null);
    const [quantity,setQuantity]=useState(1);

    const placeOrder=async ()=>{
        const result=await firebase.placeOrder(bookID,quantity);
        console.log(result);
        alert("Order placed")
    }
    useEffect(()=>{
        firebase.getBookById(bookID).then((e)=>{setBook(e.data());});
        console.log(book);
    },[])
    useEffect(()=>{
        firebase.getImageUrl(book.imageUrl).then((e)=>{console.log(e); setUrl(e)})
    },[book])
    const {bookname,displayName,imageUrl,userEmail,bookid,photoURL,price}=book;
  return (
    <div className='container mt-5'>
        <h1>{bookname}</h1>
        <img src={url} alt="imageUrl" width="50%" height="400px" style={{borderRadius:"10px",objectFit:"contain"}} />
        <h1>Details</h1>
        <p>Price: Rs. {price}</p>
        <p>Name: {displayName}</p>
        <p>Email: {userEmail}</p>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="Number" placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value>0 ? e.target.value : 1)} value={quantity}/>
            </Form.Group>
        </Form>
        <button onClick={placeOrder} style={{padding:"10px 20px 10px 20px", fontWeight:"bold", color:"white", backgroundColor:"green", border:"none",borderRadius:"3px"}}>Buy Now</button>
    </div>
  )
}

export default ViewBook
