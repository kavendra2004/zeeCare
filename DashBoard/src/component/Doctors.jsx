import React, { useContext, useEffect, useState } from "react";
import { context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const { isAuthenticated } = useContext(context);
  const [doctors, setDoctors] = useState([]);

  

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://zeecare-backend-qg1w.onrender.com/api/v1/user/doctor/getAll",
          {
            withCredentials: true,
          }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message || "Failed to fetch doctors");
      }
    };

    return () => {
      fetchDoctors();
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt="Doctor Avatar"
                  />
                  <h4>
                    {`${element.firstName} ${element.lastName}`}
                  </h4>
                  <div className="details"></div>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.DOB}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.NIC}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              );
            })
          ) : (
            <h1>No doctors found.</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
