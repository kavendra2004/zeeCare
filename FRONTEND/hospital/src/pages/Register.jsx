import React, { useContext, useState } from "react";
import { context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [NIC, setNIC] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        { firstName, lastName, email, phone, NIC, DOB, gender, password, role: "patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    }catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log("Login Error:", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Register To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel itaque
        ducimus delectus quidem, molestias perspiciatis.
      </p>
      <form onSubmit={handleRegister}>
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
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already registered?</p>
          <Link
            to="/login"
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
