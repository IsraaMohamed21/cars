import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mechanics.css';

const Mechanics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getMechanics');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (mechanicid) => {
    try {
      const response = await axios.post('http://localhost:5001/api/mechanic', { mechanic_id: mechanicid });
      console.log('Submitted:', response.data);
      console.log(mechanicid);
      // Handle success or update UI as needed
    } catch (error) {
      console.error('Error submitting mechanic ID:', error);
      // Handle error or show error message
    }
  };

  const handleDelete = async (mechanicid) => {
    try {
      const response = await axios.post('http://localhost:5000/api/deleteMechanic', { mechanic_id: mechanicid });
      console.log('Submitted:', response.data);
      console.log(mechanicid);
      // Update the requests state to remove the deleted mechanic
      setRequests(prevRequests => prevRequests.filter(request => request.mechanicid !== mechanicid));
    } catch (error) {
      console.error('Error deleting mechanic:', error);
      // Handle error or show error message
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="Dashboard">Requests</a>
            </li>
            <li>
              <a href="mechanics">Mechanics</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="requests-section">
        <h2>Mechanics</h2>
        <div className="requests-container">
          {requests.map(request => (
            <div className="request-card" key={request.id}>
              <div className="request-card-title">
                <p>{request.title}</p>
                <i 
                  className="fa fa-trash" 
                  aria-hidden="true" 
                  onClick={() => handleDelete(request.mechanicid)}
                ></i>
              </div>
              <div className="request-info">
                <p className="info-label">Name</p>
                <p className="info-label-bold">{request.name}</p>
              </div>
              <div className="request-info">
                <p className="info-label">City</p>
                <p className="info-label-bold">{request.city}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Area</p>
                <p className="info-label-bold">{request.area}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Phone</p>
                <p className="info-label-bold">{request.phone}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Sentiment</p>
                <p className="info-label-bold">{request.status}</p>
              </div>
              <input type="hidden" value={request.mechanicid} />
              <div className='SentimentDiv'>
                <button className='Sentiment' onClick={() => handleSubmit(request.mechanicid)}>Update Sentiment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mechanics;
