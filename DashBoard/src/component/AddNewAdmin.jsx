import React, { useContext, useState } from "react";
import { context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [NIC, setNIC] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://zeecare-backend-qg1w.onrender.com/api/v1/user/addNewAdmin",
        { firstName, lastName, email, phone, NIC, DOB, gender, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      navigateTo("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log("Login Error:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />; 
  }

  return (
    <>
      <section className="page">
        <div className="container form-component add-admin-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">ADD NEW ADMIN</h1>
          <form onSubmit={handleAddNewAdmin}>
            <div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              </div>
              <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
              </div>
              <div>
              <input
                type="number"
                value={NIC}
                onChange={(e) => setNIC(e.target.value)}
                placeholder="NIC"
              />
              <input
                type="date"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                placeholder="Date of Birth"
              />
              </div>
              <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">ADD NEW ADMIN</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewAdmin;
