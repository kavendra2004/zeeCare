import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
    // eslint-disable-next-line no-unused-vars
    const [show, setShow] = React.useState(false);
    const {isAuthenticated,setIsAuthenticated} = useContext(context)
    const navigateTo = useNavigate();

    const handleLogout = async() => {
    
        await axios.post("https://zeecare-backend-qg1w.onrender.com/api/v1/user/patient/logout", {}, {withCredentials:true}).then((response)=>{
            toast.success(response.data.message);
            setIsAuthenticated(false);
        }).catch((error)=>{
            toast.error(error.response.data.message);
        });

    }
    const gotoLogin = async() =>{
        navigateTo("/login")
    }

  return (
    <nav className='container'>
        <div className="logo"><img src="/logo.png" alt="logo" className='logo-img' /></div>
        <div className={show ? "navLinks showmenu": "navLinks"}>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/appointment">Appointment</Link>
            </div>
            {isAuthenticated ? (
                    <button className='logoutBtn btn' onClick={handleLogout}>Logout</button>
                ) : (
                    <button className='logoutBtn btn' onClick={gotoLogin}>Login</button>
                )}
        </div>
        <div className='hamburger' onClick={() => setShow(!show)}>
            <GiHamburgerMenu />
        </div>
    </nav>
  )
}

export default Navbar