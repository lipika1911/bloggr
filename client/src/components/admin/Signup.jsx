import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const Signup = () => {
    
    const {axios, navigate} = useAppContext();
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const {data} = await axios.post("/api/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      });

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      }else{
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span onClick={()=>navigate('/')} className='text-primary cursor-pointer'>Bloggr. </span>Signup
            </h1>
            <p className='mt-2 font-light'>Create your account to get started</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-2 w-full text-gray-600'>
            <div className='flex flex-col mb-4'>
              <label>First Name</label>
              <input
                type='text'
                name='firstName'
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder='Enter your first name'
                className='border-b-2 border-gray-300 p-2 outline-none'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label>Last Name</label>
              <input
                type='text'
                name='lastName'
                required
                value={form.lastName}
                onChange={handleChange}
                placeholder='Enter your last name'
                className='border-b-2 border-gray-300 p-2 outline-none'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                required
                value={form.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='border-b-2 border-gray-300 p-2 outline-none'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                required
                value={form.password}
                onChange={handleChange}
                placeholder='Enter password'
                className='border-b-2 border-gray-300 p-2 outline-none'
              />
            </div>
            <div className='flex flex-col mb-6'>
              <label>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm password'
                className='border-b-2 border-gray-300 p-2 outline-none'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all disabled:opacity-50'
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className='mt-4 text-sm text-center text-gray-600'>
              Already have an account?{' '}
              <Link to="/admin" className='text-primary hover:underline font-medium'>
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
