import React from 'react';
import { Outlet } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Layout = () => {
  const { axios, setToken, navigate, user, setUser, fetchProfile } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    setUser(null);
    navigate('/');
  };

  const getInitials = () => {
    if (!user) return '?';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  };

  useEffect(()=>{
    fetchProfile()
  },[])

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-8 border-b border-gray-200'>
        <img
          src={assets.logo}
          alt="logo"
          className='w-32 sm:w-40 cursor-pointer'
          onClick={() => navigate('/')}
        />
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
          >
            Logout
          </button>
          {user && (
            <div className='w-9 h-9 flex items-center justify-center rounded-full border bg-gray-100 text-primary font-semibold'>
              {getInitials()}
            </div>
          )}
        </div>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
