import React, { useContext, useEffect, useState } from 'react'
import { context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const {data} = await axios.get("http://localhost:4000/api/v1/message/getAllMessages", {
          withCredentials: true,
        });
        console.log(data)
        setMessages(data.data);
        console.log(messages);
      } catch (error) {
        console.log("error occured while fetching message : ",error)
      }
    }
    fetchMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if(!isAuthenticated){
    return <Navigate to="/login" />;
  }

  return (
    <section className='page messages'>
      <h1>Messages</h1>
      <div className="banner">
        {
          messages && messages.length > 0 ? messages.map((element) => {
            return (
              <div className="card">
                <div className="details">
                  <p>First Name: <span>{element.firstName}</span></p>
                  <p>Last Name: <span>{element.lastName}</span></p>
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>
                  <p>Message: <span>{element.message}</span></p>
                </div>
              </div>
            )
          }) : <h1>No messages found</h1>
        }
      </div>
    </section>
  )
}

export default Messages