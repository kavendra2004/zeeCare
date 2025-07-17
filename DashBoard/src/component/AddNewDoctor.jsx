import React, { useContext, useState } from "react";
import { context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [NIC, setNIC] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "fracture",
    "pediatrics",
    "orthopedics",
    "cardiology",
    "neurology",
    "dermatology",
    "radiology",
    "oncology",
    "physical therapy",
    "ENT",
  ];

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("NIC", NIC);
      formData.append("DOB", DOB);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addNew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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
        <div className="container form-component add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">REGISTER NEW DOCTOR</h1>
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={
                    docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                  }
                  alt="Doctor Avatar"
                />
                <input type="file" onChange={handleAvatar} />
              </div>
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
                <select
                  value={doctorDepartment}
                  onChange={(e) => {
                    setDoctorDepartment(e.target.value);
                  }}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((dept, index) => {
                    return (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    );
                  })}
                </select>
                <button type="submit">ADD NEW DOCTOR</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewDoctor;
