import React from 'react'
import { useState,useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import Button from 'react-bootstrap/esm/Button';
import {useNavigate} from 'react-router-dom'
const Card = ({text,link,id,props}) => {
    // console.log(props);
    const firebase=useFirebase();
    const navigate=useNavigate();
    const [url,setUrl]=useState(null);

    const {bookname,displayName,imageUrl,userEmail,bookid,photoURL,price}=props;
    useEffect(()=>{
        firebase.getImageUrl(imageUrl).then((ele)=>{setUrl(ele)});
        // console.log(url)
    },[])
  return (
    <div key={bookid}>
        <div className="card" style={{width:"20rem", margin:"25px"}} >
            <img src={url} className="card-img-top" style={{height:'250px', objectFit:"cover"}} alt="image"/>
            <div className="card-body">
                <h5 className="card-title">{bookname}</h5>
                <p className="card-text">This book is added by {userEmail} and the price of the book is {price}</p>
                <Button className="btn btn-primary" onClick={()=>navigate(link)}>{text}</Button>
            </div>
        </div>
    </div>
  )
}

export default Card
