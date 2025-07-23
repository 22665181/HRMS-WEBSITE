import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../App.css';

import profile1 from "../assets/client.jpg";
import profile2 from "../assets/EventO.png";

import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";

// Main Router Component
export default function Events() {
  return (
    <Routes>
      <Route path="/" element={<Event1 />} />
      <Route path="/schedule" element={<Events2 />} />
      <Route path="/confirmation" element={<Event3 />} />
    </Routes>
  );
}

// Event 1 Component
function Event1() {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const events = [
    {
      id: 1,
      name: "John Cena",
      title: "Quarterly Hackathon",
      image: profile1,
      duration: "30 min",
      timeZone: "Asia/Kolkata",
      time: "03:00 - Tue Jul 15 2025",
    },
    {
      id: 2,
      name: "Maria D'Souza",
      title: "Employee Onboarding Day",
      image: profile2,
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
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Event Listes -</h3>
      <div className="row">
        <div className="col-md-5 mx-auto">
          {events.map((event) => (
            <div className="card mb-4 border-0 shadow-sm" key={event.id}>
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
                  <li><FaClock /> {event.duration}</li>
                  <li className="my-2"><FaCalendarAlt /> {event.time}</li>
                  <li><FaVideo /> Web conferencing details provided upon confirmation.</li>
                  <li><FaGlobe /> {event.timeZone}</li>
                </ul>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary px-4">Join Event</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-start gap-4 flex-wrap">
            <div style={{ flex: 1 }}>
              <h5 className="mb-3 fw-bold">Select a Date & Time</h5>
              <div className="bg-white p-3 rounded shadow-sm border mb-3" style={{ display: "flex", justifyContent: "center" }}>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
              </div>
              <p className="mt-3 mb-1 fw-semibold">Time zone</p>
              <select className="form-select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
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

            <div className="text-end" style={{ minWidth: "120px" }}>
              <p className="fw-semibold mb-2">{selectedDate.toDateString()}</p>
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
              className="btn btn-primary px-4 py-2 fw-bold"
              onClick={() =>
                navigate("/schedule", {
                  state: {
                    date: selectedDate.toDateString(),
                    time: selectedTime,
                    timezone,
                  },
                })
              }
              disabled={!selectedTime}
            >
              Schedule New Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event 2 Component
function Events2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, time, timezone } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [conferenceDetails, setConferenceDetails] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: {
        name,
        email,
        eventTitle,
        conferenceDetails,
        duration,
        date,
        time,
        timezone,
      },
    });
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <img
                src={profile2}
                alt="Organizer"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #6A7ADA",
                }}
              />
              <div>
                <div className="fw-medium text-dark">Maria</div>
                <h2 className="fw-bold fs-5 mb-0 text-primary">
                  {eventTitle || "Event title"}
                </h2>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2"><FaClock /><span className="text-muted fst-italic small">{time} - {date}</span></div>
            <div className="d-flex align-items-center gap-2 mb-2"><FaCalendarAlt /><span className="text-muted fst-italic small">{duration || "30 min"}</span></div>
            <div className="d-flex align-items-center gap-2 mb-2"><FaVideo /><span className="text-muted fst-italic small">{conferenceDetails || "Web conferencing details provided upon confirmation."}</span></div>
            <div className="d-flex align-items-center gap-2"><FaGlobe /><span className="text-muted fst-italic small">{timezone}</span></div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="fw-bold fs-5 text-primary mb-3">Fill Your Details here -</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><label className="form-label">Event Title</label><input type="text" className="form-control" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Name</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
              <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div className="mb-3"><label className="form-label">Duration</label><input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Web Conferencing Details</label><input type="text" className="form-control" value={conferenceDetails} onChange={(e) => setConferenceDetails(e.target.value)} /></div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event 3 Component
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
    <div className="main-content container py-4">
      <div className="event-wrapper card p-4 shadow-sm">
        <div className="event-header text-center mb-4">
          <img src={profile1} alt="User" className="event-profile" style={{ width: 70, height: 70, borderRadius: "50%" }} />
          <h2 className="event-heading mt-3">You are scheduled</h2>
          <p className="event-subtext text-muted">A calendar invitation has been sent to your email address.</p>
        </div>

        <div className="event-card-box">
          <h4 className="event-title">{eventTitle || "Event Title"}</h4>
          <p><i className="bi bi-person-fill me-2"></i>{name || "Participant Name"}</p>
          <p><FaCalendarAlt /> {time} - {date}</p>
          <p><FaGlobe /> {timezone}</p>
          <p><FaVideo /> {conferenceDetails}</p>
        </div>
      </div>
    </div>
  );
}
