"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const page = () => {
  const router = useRouter()
  const [data, setData] =useState("nothing")

  //logout
  const logout = async() => {
    try {
      const response = await axios.post('/api/users/logout')
      if(response.status === 200) {
        console.log("logout success");
        router.push("login")
      } else {
        console.log("logout failed");
      }
      
    } catch (error) {
      console.log("error in log out try catch"+error);
      toast.error("logout failed")
      
    }
  }
  //get user detail
  const getUserDetail = async() => {
    try {
      const response = await axios.get('/api/users/me')
      console.log("User detail:", response.data);
      setData(response.data.data._id)
    } catch (error) {
      console.error("Error response:", error.response?.data || "Network error");
    }
  }


  return (
    <div className='flex justify-center items-center flex-col'>
        <h1>This is the Shenzan Ali App</h1>
        <p>Welcome to the Shenzan Ali App!</p>
        <p>This is a Next.js app.</p>
        <p>This app is using authentication.</p>
        <p>Please login or signup to access the protected page.</p>
        <p>If you don't have an account, you can create one here: <a href='/signup'>Signup</a></p>
        <p>Or you can login here: <a href='/login'>Login</a></p>

        <h2 className='rounded bg-green-500 p-3'>{data==="nothing"? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>



        <button onClick={logout} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
        <button onClick={getUserDetail} className='bg-purple-400 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Get User Detail</button>
  
    </div>
  )
}

export default page


