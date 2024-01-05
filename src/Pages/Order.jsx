import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebase'
import Card from '../Components/Card';
const Order = () => {
    const firebase=useFirebase();
    const [orders,setOrders]=useState([]);
    console.log(orders)
    
    useEffect(()=>{ 
      if(firebase.isLogedin){
        console.log(firebase.userdata.uid);
        firebase.fetchMyOrders(firebase.userdata.uid)?.then((books)=>{setOrders(books.docs);}) 
        console.log(orders); 
      }
      },[firebase.isLogedin])


  if(!firebase.isLogedin){ return (<h1 className='container' style={{paddingTop:"100px"}}>Plaease Logiin</h1>)}
  else if(orders.length==0){
    return (<h1 className='container' style={{paddingTop:"100px"}}>You have not added any book</h1>)
  }
  else{
    return (
      <div className='container' style={{display:"flex", width:"100%", flexWrap:"wrap", paddingTop:"100px"}}>
      {
        orders ? 
        orders.map((e)=>{
          return(
            <div key={e.data().bookid}>
              <Card text={"View Book Order"} link={`/order/details/${e.id}`} id={e.id} props={e.data()}/>
            </div> 
          )
        }) : <div>You have not placed any order yet</div>
      }
    </div>
  )}

}

export default Order
