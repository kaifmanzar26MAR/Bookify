import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useFirebase} from '../Context/Firebase'
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const firebase=useFirebase();
    const [user,setUser]=useState({email:"",password:""});
    const navigate=useNavigate();
    const onSubmitForm=async (e)=>{
        e.preventDefault();
        const res=await firebase.signinuserwithemailandpasswor(user.email,user.password);
        console.log(res);
        if(res) alert("Logined")
    }
    useEffect(()=>{
        if(firebase.isLogedin){
            console.log("loged in");
            navigate('/');
        }
    })
  return (
    <>
      <div className="container " style={{paddingTop:"100px"}}>
        <h3>Login</h3>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        <h5>Don't have account?<a href="/signup"> SignUp</a></h5>
        <h4 className='mt-2'>OR</h4>
        <Button variant='danger' onClick={()=>{firebase.siginwithgoogle()}}>Login with google</Button>
      </div>
    </>
  )
}

export default Register
