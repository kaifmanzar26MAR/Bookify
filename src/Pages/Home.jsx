import React from 'react'
import { useFirebase } from '../Context/Firebase'
import { useState,useEffect } from 'react';
import Card from '../Components/Card';
import CardGroup from 'react-bootstrap/CardGroup';
const Home = () => {
  const firebase=useFirebase();
  const [books,setBooks]=useState(null);
  
  useEffect(()=>{
    firebase.listallbooks().then((book_collection) => {setBooks(book_collection.docs);});
    // console.log(books)
  },[])

  if(!books){
    return <h1 className='container' style={{paddingTop:"100px"}}>Lodding...</h1>
  }else if(books.length==0){
    return <h1 className='container' style={{paddingTop:"100px"}}>No Books.. Please add a book</h1>
  }else{
    return (
      <div className='container' style={{paddingTop:"100px"}}>
        List BOOks Here
        <CardGroup>
        {
          books.map((book)=>{
            return <Card key={book.data().bookid} text={"View Book"} link={`/bookview/:${book.id}`} id={book.id} props={book.data()}/>
          })
        }
        </CardGroup>
      </div>
    )
  }
}

export default Home
