/* Event 3rd page */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";
import profile from '../assets/client.jpg';
import '../App.css'; 

function Event3() {
  const location = useLocation();
  const {
    name,
    eventTitle,
    time,
    date,
    timezone,
    conferenceDetails,
  } = location.state || {};

  return (
    <div className="main-content">
      <div className="event-wrapper">
        <div className="event-header">
          <img
            src={profile}
            alt="User"
            className="event-profile"
          />
          <h2 className="event-heading">You are scheduled</h2>
          <p className="event-subtext">A calendar invitation has been sent to your email address.</p>
        </div>

        <div className="event-card-box">
          <h4 className="event-title">{eventTitle || "Event Title"}</h4>
          <p><i className="bi bi-person-fill me-2"></i>{name || "Participant Name"}</p>
          <p><i><FaCalendarAlt /></i>{time} - {date}</p>
          <p><i ><FaGlobe /></i> {timezone}</p>
          <p><i><FaVideo /></i>{conferenceDetails}</p>
        </div>
      </div>
    </div>
  );
}

export default Event3;
