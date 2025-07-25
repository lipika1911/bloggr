import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {

  const {axios, setToken, navigate} = useAppContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', {
        email,
        password
      });

      if (data.success) {
        const bearerToken = `Bearer ${data.token}`;
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = bearerToken;
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span onClick={()=>navigate('/')} className='text-primary cursor-pointer'>Bloggr. </span>Login</h1>
            <p className='mt-2 font-light'>Please login to continue to the admin dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-2 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email" 
                required 
                placeholder='enter your email id' 
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>
            <div className='flex flex-col'>
              <label>Password</label>
              <input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                required 
                placeholder='enter your password' 
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>
            <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
            <p className='mt-4 text-sm text-center text-gray-600'>
              New here? <Link to="/signup" className="text-primary hover:underline font-medium">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login