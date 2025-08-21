import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";
import { useDarkMode } from './Recognition';
import '../App.css';

// Utility: dynamic avatar URL generation from organizer name or fallback
const getAvatarUrl = (organizer) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    organizer || "?"
  )}&background=4c57c1&color=fff&size=64`;

// Default events to show when API fails or no data is available
const defaultEvents = [
  {
    id: "default-1",
    title: "AI Masterclass",
    organizer: "Kaushik Mandal",
    duration: 45,
    date: "2026-02-28T11:59:00.000Z",
    mode_of_event: "online",
    timezone: "Asia/Kolkata",
    meeting_link: "https://meet.example.com/ai-masterclass"
  },
  {
    id: "default-2", 
    title: "Web3 & Blockchain",
    organizer: "Viky Deka",
    duration: 300, // 5 hours = 300 minutes
    date: "2025-08-15T00:00:00.000Z",
    mode_of_event: "online",
    timezone: "Europe/London",
    meeting_link: "https://meet.example.com/web-dev"
  },
  {
    id: "default-3",
    title: "Data Science Workshop",
    organizer: "Decendman Pothmi",
    duration: 120, // 2 hours
    date: "2025-09-10T14:30:00.000Z",
    mode_of_event: "hybrid",
    timezone: "America/New_York",
    meeting_link: "https://meet.example.com/data-science",
    location: "Tech Hub, 123 Innovation Street, New York"
  },
  {
    id: "default-4",
    title: "Mobile App Development",
    organizer: "Lungsom Lamino",
    duration: 180, // 3 hours
    date: "2025-10-05T09:00:00.000Z",
    mode_of_event: "offline",
    timezone: "Asia/Tokyo",
    location: "Development Center, 456 Code Avenue, Tokyo"
  },
  {
    id: "default-5",
    title: "Cloud Computing Fundamentals",
    organizer: "Pranab Mahananda",
    duration: 90, // 1.5 hours
    date: "2025-11-20T16:45:00.000Z",
    mode_of_event: "online",
    timezone: "Europe/Berlin",
    meeting_link: "https://meet.example.com/cloud-computing"
  },
  {
    id: "default-6",
    title: "UI/UX Design Bootcamp",
    organizer: "Karishma Patel",
    duration: 240, // 4 hours
    date: "2025-12-08T10:15:00.000Z",
    mode_of_event: "hybrid",
    timezone: "Asia/Dubai",
    meeting_link: "https://meet.example.com/ui-ux-design",
    location: "Design Studio, 789 Creative Plaza, Dubai"
  }
];

export default function Events() {
  const [currentStep, setCurrentStep] = useState("event1");
  const [eventData, setEventData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const { isDarkMode } = useDarkMode();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from backend API
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      const apiEvents = res.data.data || [];
      
      // If no events from API, use default events
      if (apiEvents.length === 0) {
        setEvents(defaultEvents);
      } else {
        setEvents(apiEvents);
      }
    } catch {
      // On error, show default events instead of error message
      setEvents(defaultEvents);
      // setError("Failed to load events"); // Removed to show default events instead
    } finally {
      setLoading(false);
    }
  };

  // Navigation handler between steps
  const navigateToStep = (step, data = {}) => {
    if (step === "event3") {
      setEventData({ ...eventData, ...data });
      setShowPopup(true);
    } else {
      setEventData({ ...eventData, ...data });
      setCurrentStep(step);
    }
  };

  // Close popup and refresh to event list
  const closePopup = () => {
    setShowPopup(false);
    setCurrentStep("event1");
    setEventData({});
    fetchEvents();
  };

  return (
    <div className={`container py-5 ${isDarkMode ? 'text-light' : ''}`} style={{ backgroundColor: isDarkMode ? '#121212' : 'transparent' }}>
      {currentStep === "event1" && (
        <Event1
          onNavigate={navigateToStep}
          events={events}
          loading={loading}
          error={error}
          isDarkMode={isDarkMode}
        />
      )}
      {currentStep === "event2" && (
        <Event2 onNavigate={navigateToStep} fetchEvents={fetchEvents} isDarkMode={isDarkMode} />
      )}
      {showPopup && <Event3Popup eventData={eventData} onClose={closePopup} isDarkMode={isDarkMode} />}
    </div>
  );
}

/* ---------- EVENT LIST PAGE ---------- */
function Event1({ onNavigate, events, loading, error, isDarkMode }) {
  return (
    <>
      <h2
        className="fw-bold mb-5 pb-2 border-bottom border-3"
        style={{
          fontSize: "2.75rem",
          letterSpacing: "1.5px",
          textAlign: "center",
          color: isDarkMode ? "#ffffff" : "black",
        }}
      >
        Upcoming Events & Scheduling
      </h2>

      <div
        className="row g-0 shadow rounded overflow-hidden"
        style={{ 
          minHeight: "70vh",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff"
        }}
      >
        {/* Left Panel - Create New Event Button */}
        <div
          className="col-lg-4 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: isDarkMode ? "#2d2d2d" : "#f0f0f5",
            color: isDarkMode ? "#ffffff" : "black",
            minHeight: "100%",
            flexDirection: "column",
            padding: "2rem",
          }}
        >
          <h3
            className="mb-4"
            style={{ 
              fontWeight: 700, 
              letterSpacing: "1px", 
              textAlign: "center",
              color: isDarkMode ? "#ffffff" : "inherit"
            }}
          >
            Ready to create?
          </h3>
          <button
            className="btn shadow-sm"
            onClick={() => onNavigate("event2")}
            aria-label="Create New Event"
            style={{
              fontWeight: "600",
              fontSize: "1.25rem",
              borderRadius: "10px",
              backgroundColor: "#4c57c1",
              color: "white",
              padding: "0.75rem 2.5rem",
              border: "none",
              transition: "background-color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3b448f")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4c57c1")}
          >
            + Create New Event
          </button>
        </div>

        {/* Right Panel - List of Scheduled Events */}
        <div
          className="col-lg-8 p-4 d-flex flex-column"
          style={{
            backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <h3 className="fw-bold mb-4 text-center" style={{ color: isDarkMode ? "#ffffff" : "black" }}>
            Scheduled Events
          </h3>

          {loading && (
            <div className="text-center p-4">
              <div className={`spinner-border ${isDarkMode ? 'text-light' : 'text-primary'}`} role="status" />
              <p className={`mt-3 fs-5 ${isDarkMode ? 'text-light' : 'text-muted'}`}>Loading events...</p>
            </div>
          )}

          {!loading && events.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1rem",
                flexGrow: 1,
              }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="card rounded shadow-sm border-0 d-flex flex-column justify-content-between"
                  style={{
                    backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                    boxShadow: isDarkMode 
                      ? "0 8px 16px rgba(255,255,255,0.1)" 
                      : "0 8px 16px rgba(0,0,0,0.1)",
                    minHeight: "220px",
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={getAvatarUrl(event.organizer)}
                        alt="Organizer Avatar"
                        className="me-3"
                        style={{
                          width: 55,
                          height: 55,
                          borderRadius: "50%",
                          objectFit: "cover",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                      <div>
                        <p
                          className={`mb-1 fs-7 ${isDarkMode ? 'text-light' : 'text-muted'}`}
                          style={{ letterSpacing: "0.7px" }}
                        >
                          {event.organizer || "No organizer specified"}
                        </p>
                        <h5
                          className="mb-0"
                          style={{
                            fontWeight: "700",
                            fontSize: "1.2rem",
                            color: isDarkMode ? "#ffffff" : "black",
                          }}
                        >
                          {event.title}
                        </h5>
                      </div>
                    </div>

                    <ul
                      className={`list-unstyled fs-7 mb-3 ${isDarkMode ? 'text-light' : 'text-muted'}`}
                      style={{ letterSpacing: "0.5px", flexGrow: 1 }}
                    >
                      <li className="d-flex align-items-center mb-2">
                        <FaClock
                          className="me-2 text-primary"
                          style={{ minWidth: 18, fontSize: 15 }}
                        />
                        <span>{event.duration ? `${event.duration} mins` : "No duration set"}</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <FaCalendarAlt
                          className="me-2 text-primary"
                          style={{ minWidth: 18, fontSize: 15 }}
                        />
                        <span>
                          {event.date
                            ? new Date(event.date).toLocaleString()
                            : "No date set"}
                        </span>
                      </li>

                      {/* Event Type */}
                      <li className="d-flex align-items-center mb-2">
                        <strong>Type: </strong>
                        <span style={{ textTransform: "capitalize", marginLeft: 4 }}>
                          {event.mode_of_event || "Unknown"}
                        </span>
                      </li>

                      {/* Location for offline or hybrid */}
                      {(event.mode_of_event === "offline" || event.mode_of_event === "hybrid") && (
                        <li className="d-flex align-items-center mb-2" style={{ wordBreak: "break-word" }}>
                          <strong>Location: </strong>
                          <span className="location-text" style={{ marginLeft: 4 }}>
                            {event.location || "No location specified"}
                          </span>
                        </li>
                      )}

                      {/* Meeting link for online or hybrid */}
                      {(event.mode_of_event === "online" || event.mode_of_event === "hybrid") && (
                        <li className="d-flex align-items-center mb-2" style={{ wordBreak: "break-word" }}>
                          <FaVideo className="me-2 text-primary" style={{ minWidth: 18, fontSize: 15 }} />
                          <span className="meeting-link-text">
                            {event.meeting_link || "No meeting link set"}
                          </span>
                        </li>
                      )}

                      <li className="d-flex align-items-center">
                        <FaGlobe
                          className="me-2 text-primary"
                          style={{ minWidth: 18, fontSize: 15 }}
                        />
                        <span>{event.timezone || "No timezone set"}</span>
                      </li>
                    </ul>

                    <div className="d-flex justify-content-center mt-auto">
                      <button
                        className="btn btn-primary px-5 fw-semibold shadow"
                        style={{ borderRadius: "8px", letterSpacing: "0.8px" }}
                        onClick={() => alert(`Joining ${event.title}`)}
                        aria-label={`Join ${event.title} event`}
                      >
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- EVENT CREATION FORM ---------- */
function Event2({ onNavigate, fetchEvents, isDarkMode }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [modeOfEvent, setModeOfEvent] = useState("Online");
  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Converts the date and startTime inputs to ISO datetime string
  const getISODateTime = () => {
    if (!date || !startTime) return "";
    try {
      const dt = new Date(`${date}T${startTime}`);
      if (isNaN(dt)) return "";
      return dt.toISOString();
    } catch {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!title.trim() || !date || !startTime || !duration.trim() || !timezone) {
      setError("Please fill in Title, Date, Start Time, Duration, and Timezone.");
      return;
    }

    if (
      (modeOfEvent === "Offline" || modeOfEvent === "Hybrid") &&
      !location.trim()
    ) {
      setError("Location is required for Offline and Hybrid events.");
      return;
    }

    if (
      (modeOfEvent === "Online" || modeOfEvent === "Hybrid") &&
      !meetingLink.trim()
    ) {
      setError("Meeting link is required for Online and Hybrid events.");
      return;
    }

    const numericDuration = parseInt(duration, 10);
    if (isNaN(numericDuration) || numericDuration <= 0) {
      setError("Duration must be a positive number in minutes.");
      return;
    }

    // Always provide location to satisfy NOT NULL constraint, use placeholder if online-only
    const normalizedLocation =
      modeOfEvent === "Offline" || modeOfEvent === "Hybrid"
        ? location.trim()
        : location.trim() || "Online event - virtual";

    const newEvent = {
      title: title.trim(),
      date: getISODateTime(),
      start_time: startTime, // Added explicitly here
      duration: numericDuration,
      timezone,
      mode_of_event: modeOfEvent.toLowerCase(), // normalize casing to lowercase
      organizer: organizer.trim() || null,
      location: normalizedLocation,
      meeting_link:
        modeOfEvent === "Online" || modeOfEvent === "Hybrid"
          ? meetingLink.trim()
          : "",
      // Let backend assign created_at, so do not send it here
    };

    console.log("Submitting event data:", newEvent);

    setSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/api/events", newEvent, {
        headers: { "Content-Type": "application/json" },
      });
      onNavigate("event3", {
        ...newEvent,
        id: res.data.data?.id || Date.now(),
      });
      fetchEvents();
    } catch (err) {
      let msg = "Failed to create event.";
      if (err.response?.data?.message) msg = err.response.data.message;
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
        minHeight: "100vh",
        width: "100%",
        padding: 30,
      }}
    >
      <div className="container-fluid d-flex justify-content-center">
        <div
          className="card shadow-sm p-5"
          style={{ 
            maxWidth: 600, 
            width: "100%", 
            borderRadius: "12px",
            backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "inherit"
          }}
        >
          <h4 className={`mb-4 fw-bold letter-spacing-1 ${isDarkMode ? 'text-light' : 'text-primary'}`}>
            Create New Event
          </h4>

          {error && (
            <div
              className="alert alert-danger shadow-sm fw-semibold"
              style={{ fontSize: "0.9rem" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Event Title *</label>
              <input
                className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event name"
              />
            </div>

            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Date *</label>
              <input
                type="date"
                className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Start Time *</label>
              <input
                type="time"
                className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Duration (minutes) *</label>
              <input
                type="number"
                min="1"
                className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration in minutes"
              />
            </div>

            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Timezone *</label>
              <select
                className={`form-select shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="Asia/Yerevan">Asia/Yerevan</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Europe/Berlin">Europe/Berlin</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
                <option value="Australia/Sydney">Australia/Sydney</option>
                <option value="Africa/Nairobi">Africa/Nairobi</option>
              </select>
            </div>

            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Mode of Event *</label>
              <select
                className={`form-select shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={modeOfEvent}
                onChange={(e) => setModeOfEvent(e.target.value)}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Organizer field */}
            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Organizer</label>
              <input
                className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Organizer name (optional)"
              />
            </div>

            {(modeOfEvent === "Offline" || modeOfEvent === "Hybrid") && (
              <div className="mb-4">
                <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Location *</label>
                <input
                  className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Venue / Address"
                />
              </div>
            )}

            {(modeOfEvent === "Online" || modeOfEvent === "Hybrid") && (
              <div className="mb-4">
                <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Meeting Link *</label>
                <input
                  type="url"
                  className={`form-control shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  required
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.example.com/..."
                />
              </div>
            )}

            <div className="d-flex gap-3 justify-content-end">
              <button
                type="submit"
                className="btn btn-primary px-5 fw-semibold shadow"
                disabled={submitting}
                style={{ letterSpacing: "1px", borderRadius: "8px" }}
              >
                {submitting ? "Creating..." : "Create Event"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary px-5 fw-semibold shadow"
                disabled={submitting}
                onClick={() => onNavigate("event1")}
                style={{ letterSpacing: "1px", borderRadius: "8px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- EVENT SUCCESS POPUP ---------- */
function Event3Popup({ eventData, onClose, isDarkMode }) {
  if (!eventData) return null;

  return (
    <div
      className="popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className={`popup-content rounded shadow-lg p-4 mx-3 ${isDarkMode ? 'bg-dark text-light' : 'bg-white'}`}
        style={{
          maxWidth: "480px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className={`mb-0 ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ letterSpacing: "1px" }}>
            Event Created Successfully!
          </h4>
          <button
            type="button"
            className={`btn-close ${isDarkMode ? 'btn-close-white' : ''}`}
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        <div className="text-center mb-5">
          <img
            src={getAvatarUrl(eventData.organizer)}
            alt="Organizer"
            className="rounded-circle mb-3"
            style={{
              width: 85,
              height: 85,
              boxShadow: "0 0 10px rgba(76,87,193,0.22)",
            }}
          />
          <h5 className={`fw-bold ${isDarkMode ? 'text-light' : 'text-dark'}`}>{eventData.title}</h5>
          <p className={`mb-1 fs-6 ${isDarkMode ? 'text-light' : 'text-muted'}`}>{eventData.organizer || "No organizer specified"}</p>
          <p className={`small ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ letterSpacing: "0.5px" }}>
            Your event details have been saved.
          </p>
        </div>

        <div
          className={`event-details border rounded p-4 ${isDarkMode ? 'bg-secondary border-secondary' : 'bg-light'}`}
          style={{ fontSize: "0.95rem", letterSpacing: "0.4px" }}
        >
          <p className="mb-2">
            <FaCalendarAlt className="me-2 text-primary" />
            {eventData.date ? new Date(eventData.date).toLocaleString() : ""}
          </p>
          <p className="mb-2">
            <FaClock className="me-2 text-primary" />
            {eventData.duration ? `${eventData.duration} mins` : ""}
          </p>
          <p className="mb-2">
            <FaGlobe className="me-2 text-primary" />
            {eventData.timezone}
          </p>
          <p className="mb-2">
            <strong>Type:</strong> {eventData.mode_of_event || "Unknown"}
          </p>
          {(eventData.mode_of_event === "offline" ||
            eventData.mode_of_event === "hybrid") && (
            <p className="mb-2 location-text" style={{ wordBreak: "break-word" }}>
              <FaVideo className="me-2 text-primary" />
              {eventData.location}
            </p>
          )}
          {(eventData.mode_of_event === "online" ||
            eventData.mode_of_event === "hybrid") &&
            eventData.meeting_link && (
              <p className="mb-0 meeting-link-text" style={{ wordBreak: "break-word" }}>
                <FaVideo className="me-2 text-primary" />
                <a
                  href={eventData.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4c57c1" }}
                >
                  {eventData.meeting_link}
                </a>
              </p>
            )}
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-primary px-5 py-2 fw-semibold"
            style={{ letterSpacing: "1px" }}
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
