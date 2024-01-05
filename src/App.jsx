import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Navbar from './Components/NavBars'
import List from './Pages/List'
import ViewBook from './Pages/ViewBook'
import Order from './Pages/Order'
import OrderDetail from './Pages/OrderDetail'
const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/listing' element={<List/>}/>
        <Route path='/bookview/:id' element={<ViewBook/>}/>
        <Route path='/vieworder' element={<Order/>}/>
        <Route path='/order/details/:id' element={<OrderDetail/>}/>
      </Routes>
    </>
  )
}

export default App
