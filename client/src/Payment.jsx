import React from 'react'
import {Box,Stack} from "@chakra-ui/react"
import axios from "axios"
import Card from './components/Card'
import { Link } from 'react-router-dom'

const Home = () => {

  const checkouthandler =async(amount)=>{
    const {data:{key}}=await axios.get("http://localhost:8000/api/getkey")
    const {data:{order}}=await axios.post("http://localhost:8000/checkout",{amount})
    console.log(window);
    const options ={
      key,
      amount:order.amount,
      currency:"INR",
      name:"Sinmplyjs",
      description:"Razorpay tutorial",
      image:"https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
      order_id:order.id,
      callback_url:"http://localhost:8000/paymentverification",
      prefill:{
        name:"Sagar gupta",
        email:"anandguptasir@gmail.com",
        contact:"1234567890"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }

  return (
    <Box className='bg-[#f5f5f5] h-screen'>
      <main className='p-[1vw] relative '>
      <Link to={'/'} className='absolute top-[1vw] left-[2vw] bg-purple-600 hover:bg-purple-700 text-white rounded-md p-[0.7vw]'>Back to home</Link>
        <h1 className='text-center text-[2vw] bg-blue-600 font-semibold italic'>Checkout our subscription plans</h1>
      </main>
      <p className=' font-medium ml-[3vw] text-[1.5vw]'>Which one would you like to subscribe?</p>
      <div className="flex justify-center items-center mt-[2vw] ">
      <Card title={'Basic'} amount={10} img={"https://images.unsplash.com/photo-1564910443496-5fd2d76b47fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c291cmNlfGVufDB8fDB8fHww"} checkouthandler={checkouthandler}  />
     <Card title={'Standard'} amount={20} img={"https://images.unsplash.com/photo-1529567186287-3e17bdefa342?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvdXJjZXxlbnwwfHwwfHx8MA%3D%3D"} checkouthandler={checkouthandler}  />
  
      </div>
  </Box>
  )
}

export default Home