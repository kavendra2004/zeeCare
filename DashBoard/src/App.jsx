import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import SideBar from './component/SideBar.jsx'
import DashBoard from './component/DashBoard.jsx'
import Login from './component/Login.jsx'
import AddNewDoctor from './component/AddNewDoctor.jsx'
import AddNewAdmin from './component/AddNewAdmin.jsx'
import Messages from './component/Messages.jsx'
import Doctors from './component/Doctors.jsx'
import { ToastContainer } from 'react-toastify';
import { context } from './main.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(context);

  useEffect(() => {
    const fetchUser = async() =>{
      try {
        const response = await axios.get("https://zeecare-backend-qg1w.onrender.com/api/v1/user/admin/me", {withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    }
  
    return () => {
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <>
      <Router>
        <SideBar />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App