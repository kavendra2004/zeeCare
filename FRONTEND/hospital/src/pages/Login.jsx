import React, { useContext, useState } from "react";
import { context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://zeecare-backend-qg1w.onrender.com/api/v1/user/login",
        { email, password, confirmPassword, role: "patient" },
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
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel itaque
        ducimus delectus quidem, molestias perspiciatis.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />
      <div
        style={{
          gap: "10px",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <p style={{ marginBottom: 0 }}>not registered?</p>
        <Link
          to="/register"
          style={{ textDecoration: "none", alignItems: "center" }}
        >
          Register Now
        </Link>
      </div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <button type="submit" >Login</button>
      </div>
      </form>
    </div>
  );
};

export default Login;
