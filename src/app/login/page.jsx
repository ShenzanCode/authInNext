'use client'
import { useState } from 'react';
import axios from 'axios';
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
export default function Login() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const router = useRouter();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", user);
      console.log("User created successfully:", response.data);
      toast.success("User created successfully")
      router.push('/profile');
    } catch (error) {
      console.error("Error response:", error.response?.data || "Network error");
    }
  };

  return (
    <div className='flex justify-center items-center m-auto content-center flex-col min-h-28'>
      <h1>Login</h1>
      <p>Please login to your account</p>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center m-auto'>
      <input
      className='p-2 m-2 outline-none text-blue-600 border-b-2 border-black'
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
      className='p-2 m-2 outline-none text-blue-600 border-b-2 border-black'
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    </div>
    
  );
}
