import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../App.css'

import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";

// Main Events Component with internal navigation
export default function Events() {
  const [currentStep, setCurrentStep] = useState('event1');
  const [eventData, setEventData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const navigateToStep = (step, data = {}) => {
    if (step === 'event3') {
      setEventData({ ...eventData, ...data });
      setShowPopup(true);
    } else {
      setEventData({ ...eventData, ...data });
      setCurrentStep(step);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentStep('event1');
    setEventData({});
  };

  return (
    <div style={{ position: 'relative' }}>
      {currentStep === 'event1' && <Event1 onNavigate={navigateToStep} />}
      {currentStep === 'event2' && <Event2 onNavigate={navigateToStep} eventData={eventData} />}
      
      {showPopup && (
        <Event3Popup 
          eventData={eventData} 
          onClose={closePopup}
        />
      )}
    </div>
  );
}

// Event 1 Component
function Event1({ onNavigate }) {
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const events = [
    {
      id: 1,
      name: "John Cena",
      title: "Quarterly Hackathon",
      image: "/maria.jpg",
      duration: "30 min",
      timeZone: "Asia/Kolkata",
      time: "03:00 - Tue Jul 15 2025",
    },
    {
      id: 2,
      name: "Maria D'Souza",
      title: "Employee Onboarding Day",
      image: "/maria.jpg",
      duration: "1 Hour",
      timeZone: "Asia/Kolkata",
      time: "15:30 - Tue Jul 15 2025",
    },
  ];

  const times = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  ];

  return (
    <div className="events-container" style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      width: '100%',
      padding: '20px'
    }}>
      <div className="container-fluid">
        <h3 className="fw-bold mb-4 text-center text-primary">Event Listings</h3>
        <div className="row g-4">
          <div className="col-lg-5">
            <h5 className="fw-bold mb-3 text-secondary">Upcoming Events</h5>
            {events.map((event) => (
              <div className="card event-list-card mb-4 border-0 shadow-sm" key={event.id}>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={event.image}
                      alt="avatar"
                      className="me-3"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                    <div>
                      <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>{event.name}</p>
                      <h5 className="mb-0">{event.title}</h5>
                    </div>
                  </div>
                  <ul className="list-unstyled small text-muted mb-3">
                    <li className="d-flex align-items-center mb-2">
                      <FaClock className="me-2 text-primary" style={{ minWidth: '16px' }} />
                      <span>{event.duration}</span>
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaCalendarAlt className="me-2 text-primary" style={{ minWidth: '16px' }} />
                      <span>{event.time}</span>
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaVideo className="me-2 text-primary" style={{ minWidth: '16px' }} />
                      <span>Web conferencing details provided upon confirmation.</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <FaGlobe className="me-2 text-primary" style={{ minWidth: '16px' }} />
                      <span>{event.timeZone}</span>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <button 
                      className="btn btn-primary px-4"
                      onClick={() => {
                        alert(`Joining ${event.title} with ${event.name}`);
                      }}
                      aria-label={`Join ${event.title} event with ${event.name}`}
                    >
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-3 fw-bold text-secondary">Select a Date & Time</h5>
                    <div className="bg-light p-3 rounded shadow-sm mb-4 d-flex justify-content-center">
                      <Calendar onChange={setSelectedDate} value={selectedDate} />
                    </div>
                    <div>
                      <label className="form-label fw-semibold">Time zone</label>
                      <select 
                        className="form-select" 
                        value={timezone} 
                        onChange={(e) => setTimezone(e.target.value)}
                        aria-label="Select timezone"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (India)</option>
                        <option value="Asia/Yerevan">Asia/Yerevan (Armenia)</option>
                        <option value="America/New_York">America/New_York (USA - Eastern)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (USA - Pacific)</option>
                        <option value="Europe/London">Europe/London (UK)</option>
                        <option value="Europe/Berlin">Europe/Berlin (Germany)</option>
                        <option value="Asia/Dubai">Asia/Dubai (UAE)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (Japan)</option>
                        <option value="Australia/Sydney">Australia/Sydney</option>
                        <option value="Africa/Nairobi">Africa/Nairobi (Kenya)</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 text-secondary">{selectedDate.toDateString()}</h6>
                    <div className="d-flex flex-column gap-2">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`btn fw-semibold ${selectedTime === time ? "btn-primary" : "btn-outline-primary"}`}
                          style={{ borderRadius: "8px", borderWidth: "2px" }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    className="btn btn-primary px-5 py-2 fw-bold"
                    onClick={() =>
                      onNavigate('event2', {
                        date: selectedDate.toDateString(),
                        time: selectedTime,
                        timezone,
                      })
                    }
                    disabled={!selectedTime}
                  >
                    Schedule New Event
                  </button>
                  {!selectedTime && (
                    <div className="text-muted small mt-2">
                      Please select a time slot to continue
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event 2 Component
function Event2({ onNavigate, eventData }) {
  const { date, time, timezone } = eventData || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [conferenceDetails, setConferenceDetails] = useState("");
  const [duration, setDuration] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const eventDataToSend = {
    event_title: eventTitle,
    name,
    email,
    duration,
    date,
    time,
    timezone,
    conference_details: conferenceDetails
  };

  const response = await fetch('http://localhost:5000/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventDataToSend)
  });

  if (response.ok) {
    onNavigate('event3', eventDataToSend);
  } else {
    alert('Failed to save event');
  }
};


  return (
    <div className="events-container" style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      width: '100%',
      padding: '20px'
    }}>
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src="/maria.jpg"
                  alt="Organizer"
                  style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "2px solid #6A7ADA" }}
                />
                <div>
                  <div className="fw-medium text-dark">Maria</div>
                  <h2 className="fw-bold fs-5 mb-0 text-primary">{eventTitle || "Event title"}</h2>
                </div>
              </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              <FaClock className="text-primary" style={{ minWidth: '16px' }} />
              <span className="text-muted fst-italic small">{time} - {date}</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaCalendarAlt className="text-primary" style={{ minWidth: '16px' }} />
              <span className="text-muted fst-italic small">{duration || "30 min"}</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaVideo className="text-primary" style={{ minWidth: '16px' }} />
              <span className="text-muted fst-italic small">{conferenceDetails || "Web conferencing details provided upon confirmation."}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaGlobe className="text-primary" style={{ minWidth: '16px' }} />
              <span className="text-muted fst-italic small">{timezone}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="fw-bold fs-5 text-primary mb-3">Fill Your Details here</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Event Title</label>
                <input type="text" className="form-control" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Web Conferencing Details</label>
                <input type="text" className="form-control" value={conferenceDetails} onChange={(e) => setConferenceDetails(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// Event 3 Popup Component
function Event3Popup({ eventData, onClose }) {
  const {
    name,
    eventTitle,
    time,
    date,
    timezone,
    conferenceDetails,
  } = eventData || {};

  return (
    <div 
      className="popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 1050 
      }}
      onClick={onClose}
    >
      <div 
        className="popup-content bg-white rounded shadow-lg p-4 mx-3"
        style={{ 
          maxWidth: '500px', 
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-success">Event Scheduled Successfully!</h4>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        <div className="text-center mb-4">
          <img 
            src="/maria.jpg" 
            alt="User" 
            className="rounded-circle mb-3" 
            style={{ width: 80, height: 80 }} 
          />
          <h5 className="text-primary">You are scheduled</h5>
          <p className="text-muted small">A calendar invitation has been sent to your email address.</p>
        </div>

        <div className="event-details border rounded p-3 bg-light">
          <h6 className="fw-bold mb-3 text-dark">{eventTitle || "Event Title"}</h6>
          
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-person-fill me-2 text-primary"></i>
            <span className="small">{name || "Participant Name"}</span>
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <FaCalendarAlt className="me-2 text-primary" style={{ minWidth: '16px' }} />
            <span className="small">{time} - {date}</span>
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <FaGlobe className="me-2 text-primary" style={{ minWidth: '16px' }} />
            <span className="small">{timezone}</span>
          </div>
          
          <div className="d-flex align-items-center">
            <FaVideo className="me-2 text-primary" style={{ minWidth: '16px' }} />
            <span className="small">{conferenceDetails || "Web conferencing details provided upon confirmation."}</span>
          </div>
        </div>

        <div className="text-center mt-4">
          <button 
            className="btn btn-primary px-4" 
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
