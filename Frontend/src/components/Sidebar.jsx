"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FaHome,
  FaComments,
  FaUsers,
  FaBookOpen,
  FaChartBar,
  FaCalendarAlt,
  FaUserCircle,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { key: "chat", label: "Chat", icon: <FaComments />, path: "/chat" },
  { key: "employees", label: "Employees", icon: <FaUsers />, path: "/employees" },
  { key: "feed", label: "Feed", icon: <FaBookOpen />, path: "/feed" },
  { key: "recognition", label: "Recognition", icon: <FaChartBar />, path: "/recognition" },
  { key: "event", label: "Event", icon: <FaCalendarAlt />, path: "/event" },
  { key: "profile", label: "Profile", icon: <FaUserCircle />, path: "/profile" },
  { key: "settings", label: "Settings", icon: <FaCog />, path: "/settings" },
]

const styles = `
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: #4c57c1;
  color: white;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 45;
  width: 250px;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  font-size: 16px;
  color: white;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out,
              border-radius 0.3s ease-in-out,
              transform 0.3s ease-in-out;
  border-radius: 8px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.6);
  transform: translateX(5px);
}

.nav-link.active {
  background-color: white;
  color: #4c57c1;
  font-weight: bold;
  transform: translateX(10px);
  border-radius: 8px;
}

.hamburger-button {
  display: block;
}

.sidebar-content {
  width: 100%;
  background-color: rgb(248, 249, 250);
  padding: 1rem;
  margin-left: 0;
}

/* Mobile & Tablet */
@media (max-width: 1023px) {
  .sidebar {
    transform: translateX(-100%);
    width: 250px;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar-content {
    margin-left: 0;
  }
}

/* Desktop: 1280px → 20% */
@media (min-width: 1024px) and (max-width: 1439px) {
  .sidebar {
    width: 20%;
  }

  .sidebar-content {
    margin-left: 20%;
  }
}

/* Desktop: 1440px to 1919px → interpolate */
@media (min-width: 1440px) and (max-width: 1919px) {
  .sidebar {
    width: calc(20% - ((100vw - 1280px) * 0.01));
  }

  .sidebar-content {
    margin-left: calc(20% - ((100vw - 1280px) * 0.01));
  }
}

/* Desktop: 1920px and above → 16% */
@media (min-width: 1920px) {
  .sidebar {
    width: 16%;
  }

  .sidebar-content {
    margin-left: 16%;
  }

  .hamburger-button {
    display: none;
  }

  .overlay {
    display: none;
  }
}
`

function InjectStyles({ css }) {
  return <style>{css}</style>
}

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false)
  }

  const getCurrentActivePage = () => {
    const currentPath = location.pathname
    const activeItem = navItems.find((item) => item.path === currentPath)
    return activeItem ? activeItem.key : "dashboard"
  }

  const activePage = getCurrentActivePage()

  return (
    <>
      <InjectStyles css={styles} />

      <button
        onClick={toggleMobileMenu}
        className="hamburger-button"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          width: "44px",
          height: "44px",
          padding: "12px",
          backgroundColor: "#4c57c1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)"
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)"
        }}
      >
        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          onClick={toggleMobileMenu}
        />
      )}

      <div
        className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img src="/logo.png" alt="HRMS Logo" style={{ width: "150px" }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src="/maria.jpg"
            alt="Profile"
            style={{
              width: "50px",
              borderRadius: "50%",
              marginRight: "0.5rem",
              marginLeft: "20px",
            }}
          />
          <div>
            <p style={{ margin: "0", fontWeight: "bold" }}>Maria</p>
            <small>HR Manager</small>
          </div>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: "0",
            margin: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {navItems.map((item) => (
            <li key={item.key} style={{ marginBottom: "0.5rem" }}>
              <Link
                to={item.path}
                className={`nav-link ${activePage === item.key ? "active" : ""}`}
                onClick={handleMenuClick}
                style={{ textDecoration: "none" }}
              >
                <span style={{ marginRight: "0.5rem" }}>{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
