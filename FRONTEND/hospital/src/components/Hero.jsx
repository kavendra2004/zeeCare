import React from 'react'

const Hero = ({ title ,imageUrl}) => {
  return (
    <>
        <div className='hero container'>
            <div className='banner'>
                <h1>{title}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, libero adipisci ipsam quasi sint quaerat quam veniam dolorum nemo placeat atque dicta tempora eius earum culpa quia dolorem accusantium totam laboriosam magni cumque, nobis iure eum! Cum dicta, accusantium nostrum neque, fugit nemo odit velit perferendis omnis eaque nisi harum?</p>

            </div>
            <div className="banner">
                <img src={imageUrl} alt='hero' className='animated-image' />
                <span>
                    <img src="/Vector.png" alt="vector" />
                </span>
            </div>
        </div> 
        
    </>
    
  )
}

export default Hero