import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../Context/Firebase'
const List = () => {
    const firebase=useFirebase();
    const [booklist,setBooklist]=useState({bookname:"",bookid:"",bookimage:{},price:""});
    const handleformsubmit=async (e)=>{
        e.preventDefault();
        const {bookname,bookid,bookimage,price}=booklist;
        // console.log(bookimage);
        await firebase.handlecreatenewlisting(bookname,bookid,bookimage,price)
        alert("data saved");
        setBooklist({...booklist,bookid:"",bookname:"",bookimage:{},price:""});
    }
  return (
    <>
        <Form onSubmit={handleformsubmit} className='container' style={{paddingTop:"100px"}}>
            <Form.Group className="mb-3" controlId="Book name">
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" placeholder="Book Name" onChange={(e) => setBooklist({ ...booklist, bookname: e.target.value })} value={booklist.bookname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="book id">
                <Form.Label>Book id</Form.Label>
                <Form.Control type="text" placeholder="bookid" onChange={(e)=>setBooklist({...booklist,bookid:e.target.value})} value={booklist.bookid}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="book image">
                <Form.Label>Book image</Form.Label>
                <Form.Control type="file"  onChange={(e)=>setBooklist({...booklist,bookimage:e.target.files[0]})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="book price">
                <Form.Label>Book Price</Form.Label>
                <Form.Control type="text" placeholder="bookprice" onChange={(e)=>setBooklist({...booklist,price:e.target.value})} value={booklist.price}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Book data
            </Button>
        </Form>
    </>
  )
}

export default List
