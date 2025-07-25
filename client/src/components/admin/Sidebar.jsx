import React from 'react'
import { NavLink} from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Sidebar = () => {
  const { axios, user, setToken, setUser, navigate } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    setUser(null);
    navigate('/');
  }

  return (
    <div className='flex flex-col justify-between border-r border-gray-200 min-h-80vh max-h-screen'>
      
      <div className="overflow-y-auto pt-8 flex-1">
        <NavLink end to='/admin' className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
          <img src={assets.home_icon} alt="home" className='min-w-4 w-5' />
          <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink to='/admin/addBlog' className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
          <img src={assets.add_icon} alt="add" className='min-w-4 w-5' />
          <p className='hidden md:inline-block'>Add Blogs</p>
        </NavLink>

        <NavLink to='/admin/listBlog' className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
          <img src={assets.list_icon} alt="list" className='min-w-4 w-5' />
          <p className='hidden md:inline-block'>Blog Lists</p>
        </NavLink>

        <NavLink to='/admin/comments' className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
          <img src={assets.comment_icon} alt="comments" className='min-w-4 w-5' />
          <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
      </div>

      <div className="border-t border-gray-200 px-4 py-4 md:px-9 bg-white">
        {user && (
          <div className='text-sm text-gray-700'>
            <p className='font-semibold'>{user.firstName} {user.lastName}</p>
            <p className='text-xs text-gray-500 mb-2'>{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className='mt-2 w-full bg-red-500 text-white text-sm py-1.5 rounded hover:bg-red-600 transition'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
