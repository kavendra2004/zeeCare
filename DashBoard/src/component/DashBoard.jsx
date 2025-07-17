import { useContext, useEffect, useState } from "react";
import { context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import {GoCheckCircleFill} from "react-icons/go";

const DashBoard = () => {
  const { isAuthenticated, user } = useContext(context);

  const [appointments, setAppointments] = useState([]);
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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://zeecare-backend-qg1w.onrender.com/api/v1/appointment/getAll",
          {
            withCredentials: true,
          }
        );
        setAppointments(data.data);
        console.log("Fetched appointments:", data.data);
      } catch (error) {
        setAppointments([]);
        console.error("Error fetching appointments:", error);
        toast.error(
          error.response.data.message || "Failed to fetch appointments"
        );
      }
    };

    return () => {
      fetchAppointments();
    };
  }, [isAuthenticated]);

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const { data } = await axios.put(
        `https://zeecare-backend-qg1w.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      );
      toast.success(data.message || "Appointment status updated");
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to update appointment status"
      );
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
                odit, adipisci atque dolor magni pariatur. Soluta rerum
                repudiandae quam dolores.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.dateOfAppointment}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "pending"
                              ? "value-pending"
                              : appointment.status === "rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={appointment.status}
                          onChange={(e) => {handleUpdateStatus(appointment._id, e.target.value)}}
                        >
                          <option
                            value={"pending"}
                            className="value-pending"
                            selected={appointment.status === "pending"}
                          >
                            Pending
                          </option>
                          <option
                            value={"accepted"}
                            className="value-accepted"
                            selected={appointment.status === "accepted"}
                          >
                            Accepted
                          </option>
                          <option
                            value={"rejected"}
                            className="value-rejected"
                            selected={appointment.status === "rejected"}
                          >
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{appointment.visited ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DashBoard;
