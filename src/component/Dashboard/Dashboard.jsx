import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (request_id) => {
    try {
      const response = await axios.post('http://localhost:5000/api/deleteRequests', { request_id: request_id });
      console.log('Submitted:', response.data);
      console.log(request_id);
      // Update the requests state to remove the deleted request
      setRequests(prevRequests => prevRequests.filter(request => request.id !== request_id));
    } catch (error) {
      console.error('Error submitting mechanic ID:', error);
      // Handle error or show error message
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getRequests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="Requests">Requests</a>
            </li>
            <li>
              <a href="mechanics">Mechanics</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="requests-section">
        <h2>Requests</h2>
        <div className="requests-container">
          {requests.map(request => (
            <div className="request-card" key={request.id}>
              <div className="request-card-title">
                <p>{request.id}</p>
                <i className="fa fa-trash" aria-hidden="true" 
                onClick={() => handleDelete(request.id)}></i>
              </div>
              <div className="request-info">
                <p className="info-label">Phone</p>
                <p className="info-label-bold">{request.phone}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Destination</p>
                <p className="info-label-bold">{request.destination}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Location</p>
                <p className="info-label-bold">{request.location}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Type</p>
                <p className="info-label-bold">{request.type}</p>
              </div>
              <div className="request-info">
                <p className="info-label">Cost</p>
                <p className="info-label-bold">{request.cost} EGP</p>
              </div>
              {/* <div className="request-info">
                <p className="info-label">Status</p>
                <p className="info-label-bold">{request.status}</p>
              </div> */}
              {/* <div className="request-info">
                <p className="info-label">Token</p>
                <p className="info-label-bold">{request.token}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
