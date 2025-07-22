import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";
import eventImg from "../assets/EventO.png";
import "../App.css";

const Events2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Received from Event1 via navigate state
  const { date, time, timezone } = location.state || {};

  // States for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [conferenceDetails, setConferenceDetails] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this to a server or store it
    console.log({
      name,
      email,
      eventTitle,
      conferenceDetails,
      duration,
      date,
      time,
      timezone,
    });

    navigate("/event/confirmation", {
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
        {/* Event Details */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <img
                src={eventImg}
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

            <div className="d-flex align-items-center gap-2 mb-2">
              <FaClock />
              <span className="text-muted fst-italic small">
                {time || "Time not selected"} - {date || "Date not selected"}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              <FaCalendarAlt />
              <span className="text-muted fst-italic small">
                {duration || "30 min"}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              <FaVideo />
              <span className="text-muted fst-italic small">
                {conferenceDetails ||
                  "Web conferencing details provided upon confirmation."}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FaGlobe />
              <span className="text-muted fst-italic small">
                {timezone || "Time zone not selected"}
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="fw-bold fs-5 text-primary mb-3">
              Fill Your Details here -
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter event title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 30 min"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Web Conferencing Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Zoom or Google Meet link"
                  value={conferenceDetails}
                  onChange={(e) => setConferenceDetails(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <p className="mt-3 small text-muted">
                By proceeding, you confirm that you have read and agree to
                <a href="#" className="text-decoration-none ms-1 text-primary">
                  Calendly’s Terms of Use
                </a>{" "}
                and
                <a href="#" className="text-decoration-none ms-1 text-primary">
                  Privacy Notice
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events2;
