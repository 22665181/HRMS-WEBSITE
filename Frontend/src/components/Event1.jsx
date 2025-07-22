import React, { useState } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './Events.css';
import profile1 from "../assets/client.jpg";
import profile2 from "../assets/EventO.png";
import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Event1() {
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
      time:'03:00 - Tue Jul 15 2025'

    },
    {
      id: 2,
      name: "Maria D'Souza",
      title: "Employee Onboarding Day",
      image: profile2,
      duration: '1 Hour',
      timeZone: "Asia/Kolkata",
      time: '15:30 - Tue Jul 15 2025',

    },
  ];

  const times = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  ];

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Event List</h3>
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-5 mx-auto">
          {events.map((event) => (
            <div className="card mb-4 border-0 shadow-sm" key={event.id}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="me-3"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                      {event.name}
                    </p>
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

        {/* RIGHT SIDE */}
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-start gap-4 flex-wrap">
            <div style={{ flex: 1 }}>
              <h5 className="mb-3 fw-bold">Select a Date & Time</h5>
              <div
                className="bg-white p-3 rounded shadow-sm border mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Calendar onChange={setSelectedDate} value={selectedDate} />
              </div>

              <p className="mt-3 mb-1 fw-semibold">Time zone</p>
              <select
                className="form-select"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
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

            {/* Time Slots */}
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
                navigate("/event/schedule", {
                  state: {
                    date: selectedDate.toDateString(),
                    time: selectedTime,
                    timezone: timezone,
                  },
                })
              }
            >
              Schedule New Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
