import React from 'react';
import './Sidebar.css';
import logo from './assets/logo.png';
import maria from './assets/maria.png';
import {
  FaHome,
  FaCommentDots,
  FaBell,
  FaCalendarAlt,
  FaUser,
  FaCogs,
  FaUsers,
  FaThumbsUp
} from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo & Brand */}
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
        <p className="brand-name">Human Resource Management System</p>
      </div>

      {/* User Info */}
      <div className="user-section">
        <img src={maria} alt="Profile" className="profile-pic" />
        <div className="user-details">
          <p className="user-name">Maria</p>
          <p className="user-role">HR Manager</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <div className="nav-item"><FaHome className="icon" /> Dashboard</div>
        <div className="nav-item active"><FaCommentDots className="icon" /> Chat</div>
        <div className="nav-item"><FaUsers className="icon" /> Employees</div>
        <div className="nav-item"><FaThumbsUp className="icon" /> Feed</div>
        <div className="nav-item"><FaBell className="icon" /> Recognition</div>
        <div className="nav-item"><FaCalendarAlt className="icon" /> Events</div>
        <div className="nav-item"><FaUser className="icon" /> Profile</div>
        <div className="nav-item"><FaCogs className="icon" /> Settings</div>
      </nav>
    </div>
  );
}

export default Sidebar;
