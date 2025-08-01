import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Global container to store and access data across components
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all');
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/admin/profile');
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchBlogs();
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
      fetchProfile();
    }
  },[]);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    user,
    setUser,
    fetchBlogs,
    fetchProfile  
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    return useContext(AppContext)
}