import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../Context/Firebase';

const OrderDetail = () => {
    const params=useParams();
    console.log(params);
    const firebase=useFirebase();
    const [order,setOrder]=useState(null);

    useEffect(()=>{
      firebase.getOrders(params.id)?.then((e)=>{console.log(e.docs);setOrder(e.docs);});
      console.log(order);
    },[firebase])

  if(!order){
    return <h1 className='container' style={{paddingTop:"100px"}}>Loading..</h1>
  }else if(order.length==0){
    return <h1 className='container' style={{paddingTop:"100px"}}>No Orders</h1>
  }
  else{

  
  return (
    <div className='container' style={{paddingTop:"100px",display:"flex",width:"100%",gap:"30px",flexDirection:"column"}}>
      <h1>Order Details</h1>
      {
        order.map((e)=>{
          const {displayName,photoURL,quantity,userEmail,userId}=e.data();
          return(
            <div key={e.id} style={{border:"1px solid gray",padding:"20px"}}>
              <h4>Orderd by: {displayName}</h4>
              <h6>Quantity: {quantity}</h6>
              <h6>Email: {userEmail}</h6>
              <h6>User Id: {userId}</h6>
            </div>
          )
        })
      }
    </div>
  )
}
}

export default OrderDetail
