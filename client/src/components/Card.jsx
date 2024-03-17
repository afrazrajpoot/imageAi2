import { VStack ,Image,Text, Button} from '@chakra-ui/react'
import React from 'react'

const Card = ({ title, amount,img,checkouthandler={checkouthandler}}) => {
  return (
   <VStack className='w-[20vw] bg-[#fff] hover:shadow-lg shadow-md p-[1vw] m-[1vw] border-[1px] rounded-md'>
    <h2 className='text-[1.5vw] font-semibold'>{title}</h2>
    <Image src={img} boxSize={"40"} className='rounded-md' objectFit={"cover"}/>
    <p className='text-[1vw]'>Limited Access</p>
    <p className='text-[1vw]'>Get 100 Free background</p>
    <p className='text-[1vw]'>Canvas Feature</p>
    <Text>₹{amount}</Text>
    <Button className='p-[0.7vw] bg-blue-600 text-white rounded-md hover:bg-blue-700' colorScheme='facebook' onClick={()=>checkouthandler(amount)} >Buy Now</Button>
   </VStack>
  )
}

export default Card