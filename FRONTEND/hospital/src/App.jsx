import React, { useContext, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import AboutUs from './pages/AboutUs'
import Appointment from './pages/Appointment'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import { context } from './main'
import axios from 'axios'
import Footer from './components/Footer'

const App = () => {
  const{setUser,isAuthenticated,setIsAuthenticated} = useContext(context);
  useEffect(() => {
    const fetchUser = async() =>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", {withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user);
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position='top-center'/>
    </>
  )
}

export default App