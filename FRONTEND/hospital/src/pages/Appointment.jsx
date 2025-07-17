import React from 'react'
import AppointmentFrom from '../components/AppointmentFrom'
import Hero from '../components/Hero'

const Appointment = () => {
  return (
    <>
      <Hero title={"Book Your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"} />
      <AppointmentFrom />
    </>
  )
}

export default Appointment