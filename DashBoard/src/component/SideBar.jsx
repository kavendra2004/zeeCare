import React, { useContext, useState } from 'react'
import { context } from '../main';
import { TiHome } from 'react-icons/ti';
import { FaUserMd } from 'react-icons/fa';
import { MdAddModerator  } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { AiFillMessage } from 'react-icons/ai';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';

const SideBar = () => {

    const [show, setShow] = useState(false);
    const {isAuthenticated,setIsAuthenticated} =useContext(context)

    const navigateTo = useNavigate();

    const gotoDoctorsPage = () => {
        navigateTo('/doctors');
        setShow(!show);
    }
    const gotoMessagesPage = () => {
        navigateTo('/messages');
        setShow(!show);
    }
    const gotoAddNewDoctor = () => {
        navigateTo('/doctors/addnew');
        setShow(!show);
    }
    const gotoAddNewAdmin = () => {
        navigateTo('/admin/addnew');
        setShow(!show);
    }
    const gotoHome = () => {
        navigateTo('/');
        setShow(!show);
    }
    const handleLogout = async() => {
    
        await axios.post("https://zeecare-backend-qg1w.onrender.com/api/v1/user/admin/logout", {}, {withCredentials:true}).then((response)=>{
            toast.success(response.data.message);
            setIsAuthenticated(false);
        }).catch((error)=>{
            toast.error(error.response.data.message);
        });

    }

  return (
    <>
    <nav style={!isAuthenticated ? {display: 'none'} : {display: 'flex'}} className={show ? "show sidebar" : "sidebar"}> 
        <div className="links">
            <TiHome onClick={gotoHome}/>
            <FaUserMd onClick={gotoDoctorsPage}/>
            <MdAddModerator  onClick={gotoAddNewAdmin}/>
            <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
            <AiFillMessage onClick={gotoMessagesPage}/>
            <RiLogoutBoxFill onClick={handleLogout}/>
        </div>
    </nav>
    <div style={!isAuthenticated ? {display: 'none'} : {display: 'flex'}} className='wrapper'>
        <GiHamburgerMenu className='hamburger' onClick={() => setShow(!show)}/>
    </div>
    </>
  )
}

export default SideBar