import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppointmentFrom = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [NIC, setNIC] = useState("");
    const [DOB, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [password] = useState("");
    const [dateOfAppointment, setDateOfAppointment] = useState("");
    const [department, setDepartment] = useState("");
    const [doctor_firstName, setDoctor_firstName] = useState("");
    const [doctor_lastName, setDoctor_lastName] = useState("");
    const [hasVisited, setHasVisited] = useState(false);
    const [address, setAddress] = useState("");

    const departmentsArray=[
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
    ]

    const navigateTo = useNavigate();

    const [doctors,setDoctors] = useState([]);
    useEffect(() => {
      const fetchDoctors = async() =>{
        const {data} = await axios.get("https://zeecare-backend-qg1w.onrender.com/api/v1/user/doctor/getAll", {withCredentials:true})
        setDoctors(data.doctors);
      }
    
      fetchDoctors();
    }, []);
    const handleAppointment = async (e) => {
        e.preventDefault();
        try {
            const hasVistedBool = Boolean(hasVisited);
            const {data} = await axios.post("https://zeecare-backend-qg1w.onrender.com/api/v1/appointment/post",{
                firstName,
                lastName,
                email,
                phone,
                NIC,
                DOB,
                gender,
                password,
                dateOfAppointment,
                department,
                doctor_firstName,
                doctor_lastName,
                hasVisited: hasVistedBool,
                address
            },{
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
              }
          );
          navigateTo("/");
          toast.success(data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
    }

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <p>Please fill in the details to book an appointment</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel itaque
        ducimus delectus quidem, molestias perspiciatis.
      </p>
      <form onSubmit={handleAppointment}>
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
        <input type="date" placeholder='Date of Appointment' value={dateOfAppointment} onChange={(e) => setDateOfAppointment(e.target.value)} />
        </div>
        <div>
          <select value={department} onChange={(e) => {
            setDepartment(e.target.value);
            setDoctor_firstName("");
            setDoctor_lastName("");
            }}>
              <option value="">Select Department</option>
            {departmentsArray.map((dept, index) => {
              return (
                <option key={index} value={dept}>
                  {dept}
                </option>
              );
            })}
          </select>
          
          <select value={`${doctor_firstName} ${doctor_lastName}`} onChange={(e) => {
            const [firstName, lastName] = e.target.value.split(" ");
            setDoctor_firstName(firstName);
            setDoctor_lastName(lastName);
          }} disabled={!department} >
            <option value="">Select Doctor</option>
            {doctors.filter(doctor => doctor.doctorDepartment === department).map((doctor, index) => {
              return (
                <option key={index} value={`${doctor.firstName} ${doctor.lastName}`}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              );
            })}
          </select>
        </div>
        <textarea rows={10} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have You Visited before?</p>
          <input type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} 
          style={{flex: "none", width: "25px", }}/>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Get Appointment</button>
        </div>
      </form>
    </div>
  )
}

export default AppointmentFrom