import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {

    const departmentsArray = [
        { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
        { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
        { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
        { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
        { name: "Oncology", imageUrl: "/departments/onco.jpg" },
        { name: "Radiology", imageUrl: "/departments/radio.jpg" },
        { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
        { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
        { name: "ENT", imageUrl: "/departments/ent.jpg" }
    ];
    
    const responsive = {
    extraLarge: {
        // the naming can be any, depends on you.
        breakpoint: { max: 3000, min: 1324 },
        items: 4,
        slideToSlide:1 //default is 1, you can change it to any number

    },
    large: {
        breakpoint: { max: 1324, min: 1005 },
        items: 3,
        slideToSlide:1 //default is 1, you can change it to any number
    },
    medium: {
        breakpoint: { max: 1005, min: 700 },
        items: 2,
        slideToSlide:1 //default is 1, you can change it to any number
    },
    small: {
        breakpoint: { max: 700, min: 0 },
        items: 1,
        slideToSlide:1 //default is 1, you can change it to any number
    }
    };
  return (
    <>
        <div className="container departments">
            <h2>Departments</h2>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["medium", "small"]}>
                {departmentsArray.map((department, index) => {
                    return(
                        <div key={index} className="card">
                            <div className="depart-name">{department.name}</div>
                            <img src={department.imageUrl} alt={department.name} />
                        </div>
                    )
                    
                })}
            </Carousel>
        </div>
        
    
    </>
  )
}

export default Departments; 