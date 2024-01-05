import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../Context/Firebase';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
const Navbars=()=>{
  const firebase=useFirebase();
  const [login,setLogin]=useState(null);
  const navigate=useNavigate();
// console.log(login.email)
  // useEffect(()=>{
  //   if(firebase.isLogedin){
  //     setLogin(firebase.userdata.email)
  //     console.log("hi login")
      
  //   }
  // },[firebase.isLogedin])
 

  
  return (
    <Navbar className="" style={{backgroundColor:"gray", position:"fixed", width:"100%", zIndex:"99"}}>
      <Container>
        <Navbar.Brand href="/">BOOKIFY</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end flex gap-3">
          <Navbar.Text>
          {firebase.isLogedin ? <a href="/listing">Add Book</a> : ""} 
            
          </Navbar.Text>
          <Navbar.Text>
          {firebase.isLogedin ? <a href="/vieworder">Your Books</a> : ""} 
          </Navbar.Text>
          <Navbar.Text>
          {firebase.isLogedin ? <a>{firebase.userdata.displayName? firebase.userdata.displayName : firebase.userdata.email}</a> : <a href="/login">Login</a>}
          </Navbar.Text>
          <Navbar.Text>
            {firebase.isLogedin ? <Button variant='danger' onClick={()=>{firebase.logout();navigate('/')}}>Logout</Button> : ""}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;