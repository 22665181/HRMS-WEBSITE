"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { DarkModeProvider } from "./components/Recognition"
import Sidebar from "./components/Sidebar"
import DashboardMain from "./components/Dashboard"
import Chat from "./components/Chat"
import Feed from "./components/Feed"
import Employee from "./components/Employee"
import Recognition from "./components/Recognition"
import Events from "./components/Events"
import Profile from "./components/Profile"
import Settings from "./components/Settings"

// import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <DarkModeProvider>
      <div className="d-flex h-100" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div
          style={{
            width: "100%",
            backgroundColor: "#f8f9fa",
            marginLeft: isMobile ? 0 : "19.85%",
            minWidth: isMobile ? "100%" : "calc(80% - 250px)",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardMain />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/event" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </DarkModeProvider>
  )
}

export default App
