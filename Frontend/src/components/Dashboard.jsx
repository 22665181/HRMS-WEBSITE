"use client"

import { useState, useMemo, useEffect } from "react"
import { useDarkMode } from "./Recognition"
import { useNavigate } from "react-router-dom"
import {
  FaSearch,
  FaUserFriends,
  FaCheck,
  FaPlaneDeparture,
  FaRegChartBar,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa"
import axios from "axios"

// import "../index.css"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

const Dashboard = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setEventsLoading(true)
    try {
      const response = await axios.get("http://localhost:5000/api/events")
      setEvents(response.data.data || [])
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setEvents([])
    } finally {
      setEventsLoading(false)
    }
  }

  const baseData = {
    week: {
      kpis: {
        totalEmployees: { value: 1247, change: "+2%", period: "from last week" },
        activeToday: { value: 1189, percentage: "95.3%", label: "attendance rate" },
        onLeave: { value: 58, percentage: "4.7%", label: "of workforce" },
        avgPerformance: { value: "8.7/10", change: "+0.1", period: "from last week" },
        upcomingEvents: {
          value: events.filter((event) => new Date(event.date) > new Date()).length,
          change: "+3",
          period: "this week",
        },
      },
      monthlyHiring: [
        { month: "Mon", hires: 12, departures: 2 },
        { month: "Tue", hires: 8, departures: 1 },
        { month: "Wed", hires: 15, departures: 3 },
        { month: "Thu", hires: 10, departures: 1 },
        { month: "Fri", hires: 18, departures: 2 },
        { month: "Sat", hires: 5, departures: 0 },
        { month: "Sun", hires: 3, departures: 1 },
      ],
    },
    month: {
      kpis: {
        totalEmployees: { value: 1247, change: "+12%", period: "from last month" },
        activeToday: { value: 1189, percentage: "95.3%", label: "attendance rate" },
        onLeave: { value: 58, percentage: "4.7%", label: "of workforce" },
        avgPerformance: { value: "8.7/10", change: "+0.3", period: "from last month" },
        upcomingEvents: {
          value: events.filter((event) => new Date(event.date) > new Date()).length,
          change: "+3",
          period: "this week",
        },
      },
      monthlyHiring: [
        { month: "Jan", hires: 45, departures: 12 },
        { month: "Feb", hires: 52, departures: 8 },
        { month: "Mar", hires: 38, departures: 15 },
        { month: "Apr", hires: 61, departures: 9 },
        { month: "May", hires: 49, departures: 11 },
        { month: "Jun", hires: 67, departures: 7 },
      ],
    },
    quarter: {
      kpis: {
        totalEmployees: { value: 1247, change: "+18%", period: "from last quarter" },
        activeToday: { value: 1189, percentage: "95.3%", label: "attendance rate" },
        onLeave: { value: 58, percentage: "4.7%", label: "of workforce" },
        avgPerformance: { value: "8.7/10", change: "+0.5", period: "from last quarter" },
        upcomingEvents: {
          value: events.filter((event) => new Date(event.date) > new Date()).length,
          change: "+15",
          period: "this quarter",
        },
      },
      monthlyHiring: [
        { month: "Q1", hires: 135, departures: 35 },
        { month: "Q2", hires: 177, departures: 27 },
        { month: "Q3", hires: 156, departures: 31 },
        { month: "Q4", hires: 189, departures: 22 },
      ],
    },
    year: {
      kpis: {
        totalEmployees: { value: 1247, change: "+25%", period: "from last year" },
        activeToday: { value: 1189, percentage: "95.3%", label: "attendance rate" },
        onLeave: { value: 58, percentage: "4.7%", label: "of workforce" },
        avgPerformance: { value: "8.7/10", change: "+0.8", period: "from last year" },
        upcomingEvents: {
          value: events.filter((event) => new Date(event.date) > new Date()).length,
          change: "+32",
          period: "this year",
        },
      },
      monthlyHiring: [
        { month: "2020", hires: 456, departures: 123 },
        { month: "2021", hires: 523, departures: 98 },
        { month: "2022", hires: 612, departures: 145 },
        { month: "2023", hires: 687, departures: 112 },
        { month: "2024", hires: 734, departures: 89 },
      ],
    },
  }

  const staticData = {
    recentActivities: [
  ...events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return !isNaN(eventDate) && eventDate > new Date();
    })
    .slice(0, 3)
    .map((event) => ({
      id: `event-${event.id}`,
      name: event.organizer || "Event Organizer",
      action: `scheduled "${event.title}"`,
      time: new Date(event.date).toLocaleDateString(),
      type: "Event",
      avatar: "/api/placeholder/40/40",
      eventData: event,
    })),
    ],
    departments: [
      { name: "Health", count: 342, color: "#ef4444ff" },
      { name: "Sales", count: 289, color: "#10b981" },
      { name: "Marketing", count: 156, color: "#06b6d4" },
      { name: "Training", count: 89, color: "#f97316" },
      { name: "Design", count: 89, color: "#6366f1" },
    ],
    employeeTypes: [
      { name: "Full-Time", value: 856, color: "#8b5cf6" },
      { name: "Part-Time", value: 234, color: "#06b6d4" },
      { name: "Contract", value: 157, color: "#f97316" },
    ],
    performanceMetrics: [
      { department: "Health", performance: 8.9 },
      { department: "Sales", performance: 8.5 },
      { department: "Marketing", performance: 8.7 },
      { department: "Training", performance: 9.1 },
      { department: "Design", performance: 10 },
    ],
    attendanceTrend: [
      { week: "Week 1", attendance: 94.2 },
      { week: "Week 2", attendance: 95.8 },
      { week: "Week 3", attendance: 93.5 },
      { week: "Week 4", attendance: 96.1 },
      { week: "Week 5", attendance: 95.3 },
    ],
  }

  const dashboardData = useMemo(() => {
    const timeframeData = baseData[selectedTimeframe]
    let filteredDepartments = staticData.departments

    if (selectedDepartment !== "all") {
      filteredDepartments = staticData.departments.filter((dept) => dept.name === selectedDepartment)
    }

    return {
      ...timeframeData,
      ...staticData,
      departments: filteredDepartments,
    }
  }, [selectedTimeframe, selectedDepartment, events])

  const handleKPIClick = (kpiType, data) => {
    setModalData({ type: kpiType, data })
    setShowModal(true)
  }

  const handleChartClick = (data, chartType) => {
    setModalData({ type: chartType, data })
    setShowModal(true)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const maxDeptCount = Math.max(...dashboardData.departments.map((d) => d.count))

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`shadow-sm border-b transition-colors duration-300 px-4 sm:px-6 py-4 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1
              className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              HR Portal
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className={`px-2 sm:px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search employees..."
                className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-48 lg:w-64 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-400" }`} >
                  <FaSearch />
              </div>
            </div>
            <button
              onClick={() => navigate("/settings")}
              className={`p-2 transition-colors duration-200 ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FaCog className="text-2xl"/>
            </button>
            <div className="relative">
              <div
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span className="text-white text-sm font-medium">JD</span>
              </div>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 border transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  {/* Current Profile Image */}
                  <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">JD</span>
                      </div>
                      <div>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>John Doe</p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>HR Manager</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate("/Profile")
                        setShowProfileDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                     <span className="inline-flex items-center gap-2"> <FaUser /> profile </span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/login")
                        setShowProfileDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <div className="border-t pb-2"></div>  
                      <span className={`inline-flex items-center gap-2 ${ isDarkMode ? "text-red-400" : "text-red-600"} `}> <FaSignOutAlt /> Logout </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header> 

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Welcome Section */}
        <section className="mb-6 sm:mb-8">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Dashboard Overview
          </h2>
          <p
            className={`text-sm sm:text-base transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Welcome back! Here's what's happening with your team today.
          </p>
        </section>

        {/* KPI Cards - keeping existing gradients */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div
            className={`bg-gradient-to-br from-[#EBDDFE] to-[#D5B9FA] rounded-xl p-4 sm:p-6 text-gray-800 shadow-lg cursor-pointer transform transition-all duration-300 ${hoveredCard === "employees" ? "scale-105 shadow-xl" : "hover:scale-105 hover:shadow-xl"}`}
            onMouseEnter={() => setHoveredCard("employees")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleKPIClick("employees", dashboardData.kpis.totalEmployees)}
          >
            <div className={"flex items-center justify-between"}>
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-purple-400" : "text-purple-700"}`}>Total Employees</p>
                <p className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? "text-purple-500" : "text-purple-900"}`}>
                  {dashboardData.kpis.totalEmployees.value.toLocaleString()}
                </p>
                <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}>
                  {dashboardData.kpis.totalEmployees.change} {dashboardData.kpis.totalEmployees.period}
                </p>
              </div>
              <div className="bg-white/30 bg-opacity-30 rounded-lg sm: transition-transform duration-200 hover:rotate-12">
                <span className="text-xl sm:text-2xl"><FaUserFriends className={` ${isDarkMode ? "bg-gray-900 text-purple-500" : "text-purple-900"}`}/> </span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-4 sm:p-6 text-gray-800 shadow-lg cursor-pointer transform transition-all duration-300 ${hoveredCard === "active" ? "scale-105 shadow-xl" : "hover:scale-105 hover:shadow-xl"}`}
            onMouseEnter={() => setHoveredCard("active")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleKPIClick("active", dashboardData.kpis.activeToday)}
          >
            <div className="flex items-center justify-between ">
              <div>
                <p className={` text-xs sm:text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-700"}`}>Active Today</p>
                <p className={`text-2xl sm:text-3xl font-bold  ${isDarkMode ? "text-green-500" : "text-green-900"}`}>
                  {dashboardData.kpis.activeToday.value.toLocaleString()}
                </p>
                <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-green-300" : "text-green-600"}`}>
                  {dashboardData.kpis.activeToday.percentage} {dashboardData.kpis.activeToday.label}
                </p>
              </div>
              <div className="bg-white/30 bg-opacity-30 rounded-lg sm: transition-transform duration-200 hover:rotate-12">
                <span className="text-xl sm:text-2xl"><FaCheck className={` ${isDarkMode ? "bg-gray-900 text-green-500" : "text-green-900"}`} /></span>
              </div>
            </div>
          </div>

          <div
            className={`bg-gradient-to-br from-[#D8F0FB] to-[#A9DCF4] rounded-xl p-4 sm:p-6 text-gray-800 shadow-lg cursor-pointer transform transition-all duration-300 ${hoveredCard === "leave" ? "scale-105 shadow-xl" : "hover:scale-105 hover:shadow-xl"}`}
            onMouseEnter={() => setHoveredCard("leave")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleKPIClick("leave", dashboardData.kpis.onLeave)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-blue-400 " : "text-blue-700 "}`}>On Leave</p>
                <p className={`text-2xl sm:text-3xl font-bold  ${isDarkMode ? "text-blue-500" : "text-blue-900"}`}>{dashboardData.kpis.onLeave.value}</p>
                <p className={` text-xs sm:text-sm mt-1 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}>
                  {dashboardData.kpis.onLeave.percentage} {dashboardData.kpis.onLeave.label}
                </p>
              </div>
              <div className="bg-white/30 bg-opacity-30 rounded-lg sm: transition-transform duration-200 hover:rotate-12">
                <span className="text-xl sm:text-2xl"><FaPlaneDeparture className={` ${isDarkMode ? "bg-gray-900 text-blue-500" : "text-blue-900"}`}/></span>
              </div>
            </div>
          </div>

          {/* <div
            className={`bg-gradient-to-br from-[#FFE8D4] to-[#FFC9A7] rounded-xl p-4 sm:p-6 text-gray-800 shadow-lg cursor-pointer transform transition-all duration-300 ${hoveredCard === "performance" ? "scale-105 shadow-xl" : "hover:scale-105 hover:shadow-xl"}`}
            onMouseEnter={() => setHoveredCard("performance")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleKPIClick("performance", dashboardData.kpis.avgPerformance)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={` text-xs sm:text-sm font-medium ${isDarkMode ? "text-red-500" : "text-red-600"}`}>Avg Performance</p>
                <p className={`text-2xl sm:text-3xl font-bold  ${isDarkMode ? "text-red-600" : "text-red-700"} `}>
                  {dashboardData.kpis.avgPerformance.value}
                </p>
                <p className={` text-xs sm:text-sm mt-1 ${isDarkMode ? "text-red-400" : "text-red-500"}`}>
                  {dashboardData.kpis.avgPerformance.change} {dashboardData.kpis.avgPerformance.period}
                </p>
              </div>
              <div className="bg-white/30 bg-opacity-30 rounded-lg sm: transition-transform duration-200 hover:rotate-12">
                <span className="text-xl sm:text-2xl"><FaRegChartBar className={`${isDarkMode ? "bg-gray-900 text-red-500 " : "text-red-700 "}`}/></span>
              </div>
            </div>
          </div> */}
          
          <div
            className={`bg-gradient-to-br from-[#FFE8D4] to-[#FFC9A7] rounded-xl p-4 sm:p-6 text-gray-800 shadow-lg cursor-pointer transform transition-all duration-300 ${hoveredCard === "events" ? "scale-105 shadow-xl" : "hover:scale-105 hover:shadow-xl"}`}
            onMouseEnter={() => setHoveredCard("events")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleKPIClick("events", dashboardData.kpis.upcomingEvents)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-red-400" : "text-red-700"}`}>Upcoming Events</p>
                <p className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? "text-red-500" : "text-red-900"}`}>
                  {dashboardData.kpis.upcomingEvents.value}
                </p>
                <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-red-300" : "text-red-600"}`}>
                  {dashboardData.kpis.upcomingEvents.change} {dashboardData.kpis.upcomingEvents.period}
                </p>
              </div>
              <div className="bg-white/30 bg-opacity-30 rounded-lg sm: transition-transform duration-200 hover:rotate-12">
                <span className="text-xl sm:text-2xl"><FaCalendarAlt className={`${isDarkMode ? "bg-gray-900 text-red-500" : "text-red-900"}`}/></span>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Employee Types Pie Chart */}
          <div
            className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Employee Types
              </h3>
              <button
                onClick={() => handleChartClick(dashboardData.employeeTypes, "employeeTypes")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                View Details →
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dashboardData.employeeTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => handleChartClick(data, "pieSlice")}
                  className="cursor-pointer"
                >
                  {dashboardData.employeeTypes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {dashboardData.employeeTypes.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center cursor-pointer hover:opacity-75 transition-opacity duration-200"
                >
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                  <span
                    className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Hiring Trends - now updates based on timeframe */}
          <div
            className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {selectedTimeframe === "week"
                  ? "Daily"
                  : selectedTimeframe === "month"
                    ? "Monthly"
                    : selectedTimeframe === "quarter"
                      ? "Quarterly"
                      : "Yearly"}{" "}
                Hiring Trends
              </h3>
              <button
                onClick={() => handleChartClick(dashboardData.monthlyHiring, "hiringTrends")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                View Details →
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dashboardData.monthlyHiring}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="hires"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  className="cursor-pointer"
                />
                <Area
                  type="monotone"
                  dataKey="departures"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  className="cursor-pointer"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div
            className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Performance by Department
              </h3>
              <button
                onClick={() => handleChartClick(dashboardData.performanceMetrics, "performance")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                View Details →
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dashboardData.performanceMetrics} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis dataKey="department" type="category" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="performance"
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
                  onClick={(data) => handleChartClick(data, "performanceBar")}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <div
            className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Recent Activities
                </h3>
                <p
                  className={`text-sm sm:text-base transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Latest updates from your HR system
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02] ${
                    activity.type === "New Hire"
                        ? "bg-green-100 text-green-800 hover:bg-green-300"
                        : activity.type === "Review"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-300"
                          : activity.type === "Event"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-300"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-300"
                  }`}
                  onClick={() => handleChartClick(activity, "activity")}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center hover:rotate-6 transition-transform duration-200">
                    {activity.type === "Event" ? (
                      <FaCalendarAlt className="text-white text-sm" />
                    ) : (
                      <span className="text-white text-sm font-medium">
                        {activity.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm transition-colors duration-300">
                      <strong>{activity.name}</strong> {activity.action}
                    </div>
                    <div className="text-xs transition-colors duration-300">
                      {activity.time}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-110 ${
                      activity.type === "New Hire"
                        ? "bg-green-200 text-green-800 hover:bg-green-200"
                        : activity.type === "Review"
                          ? "bg-blue-200 text-blue-800 hover:bg-blue-200"
                          : activity.type === "Event"
                            ? "bg-purple-200 text-purple-800 hover:bg-purple-200"
                            : "bg-yellow-200 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Overview with Attendance Trend */}
          <div className="space-y-4 sm:space-y-6">
            <div
              className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Department Overview
                </h3>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="all">All Departments</option>
                  {staticData.departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <p
                className={`text-sm sm:text-base mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Employee distribution by department
              </p>
              <div className="space-y-4">
                {dashboardData.departments.map((dept) => (
                  <div
                    key={dept.name}
                    className={`flex items-center justify-between cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleChartClick(dept, "department")}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded transition-transform duration-200 hover:scale-125"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {dept.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-32 rounded-full h-2 overflow-hidden ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
                      >
                        <div
                          className="h-2 rounded-full transition-all duration-500 hover:brightness-110"
                          style={{
                            width: `${(dept.count / maxDeptCount) * 100}%`,
                            backgroundColor: dept.color,
                          }}
                        ></div>
                      </div>
                      <span
                        className={`text-sm w-20 text-right transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {dept.count} employees
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Attendance Trend
                </h3>
                <button
                  onClick={() => handleChartClick(dashboardData.attendanceTrend, "attendance")}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                >
                  View Details →
                </button>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dashboardData.attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2, fill: "#fff" }}
                    className="cursor-pointer"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Events Overview Chart */}
        {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div
            className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Recent Events
              </h3>
              <button
                onClick={() => navigate('/events')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                View All Events →
              </button>
            </div>
            <div className="space-y-3">
              {eventsLoading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="mt-2 text-muted">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center p-4">
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    No events scheduled
                  </p>
                </div>
              ) : (
                events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                      isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => handleChartClick(event, "eventDetail")}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        {event.title}
                      </div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {new Date(event.date).toLocaleDateString()} • {event.organizer || "No organizer"}
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      event.mode_of_event === "online" 
                        ? "bg-blue-100 text-blue-800" 
                        : event.mode_of_event === "offline"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {event.mode_of_event || "online"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section> */}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div
            className={`rounded-xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto transform transition-all duration-300 scale-100 mx-2 sm:mx-0 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-xl sm:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {modalData?.type === "employees" && "Employee Details"}
                {modalData?.type === "active" && "Active Employees Today"}
                {modalData?.type === "events" && "Upcoming Events Details"}
                {modalData?.type === "eventDetail" && "Event Details"}
                {modalData?.type === "leave" && "Employees on Leave"}
                {modalData?.type === "performance" && "Performance Metrics"}
                {modalData?.type === "employeeTypes" && "Employee Type Distribution"}
                {modalData?.type === "hiringTrends" && "Hiring Trends Analysis"}
                {modalData?.type === "attendance" && "Attendance Analysis"}
                {modalData?.type === "department" && `${modalData?.data?.name} Department`}
                {modalData?.type === "activity" && "Activity Details"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className={`text-2xl transition-colors duration-200 ${
                  isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                ×
              </button>
            </div>
            
            {modalData?.type === "events" && (
              <div className="space-y-4">
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Total upcoming events: <strong>{modalData.data.value}</strong>
                </p>
                <div className="grid gap-4">
                  {events.filter(event => new Date(event.date) > new Date()).map(event => (
                    <div key={event.id} className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{event.title}</h4>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {new Date(event.date).toLocaleDateString()} • {event.organizer || "No organizer"}
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Mode: {event.mode_of_event} • Duration: {event.duration} mins
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modalData?.type === "eventDetail" && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                  <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {modalData.data.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <FaCalendarAlt className="inline mr-2" />
                        Date: {new Date(modalData.data.date).toLocaleDateString()}
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <FaClock className="inline mr-2" />
                        Duration: {modalData.data.duration} minutes
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Organizer: {modalData.data.organizer || "No organizer"}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Mode: {modalData.data.mode_of_event}
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Timezone: {modalData.data.timezone}
                      </p>
                      {modalData.data.location && (
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Location: {modalData.data.location}
                        </p>
                      )}
                    </div>
                  </div>
                  {modalData.data.meeting_link && (
                    <div className="mt-4">
                      <a 
                        href={modalData.data.meeting_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Join Meeting →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

              {modalData?.type === "employees" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Total Count</h4>
                      <p className="text-2xl font-bold text-blue-900">{modalData.data.value}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">Growth</h4>
                      <p className="text-2xl font-bold text-green-900">{modalData.data.change}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Period</h4>
                      <p className="text-lg font-medium text-purple-900">{modalData.data.period}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Employee Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>New Hires: 67 employees</div>
                      <div>Departures: 7 employees</div>
                      <div>Promotions: 23 employees</div>
                      <div>Transfers: 12 employees</div>
                    </div>
                  </div>
                </div>
              )}

              {modalData?.type === "active" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">Present Today</h4>
                      <p className="text-2xl font-bold text-green-900">{modalData.data.value}</p>
                      <p className="text-sm text-green-700">{modalData.data.percentage} attendance rate</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800">Absent Today</h4>
                      <p className="text-2xl font-bold text-red-900">{1247 - modalData.data.value}</p>
                      <p className="text-sm text-red-700">
                        {(100 - Number.parseFloat(modalData.data.percentage)).toFixed(1)}% absent
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Attendance by Department</h4>
                    <div className="space-y-2">
                      {dashboardData.departments.map((dept) => (
                        <div key={dept.name} className="flex justify-between items-center">
                          <span>{dept.name}</span>
                          <span className="font-medium">
                            {Math.floor(dept.count * 0.95)} / {dept.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalData?.type === "leave" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800">On Leave</h4>
                      <p className="text-2xl font-bold text-blue-900">{modalData.data.value}</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Pending Requests</h4>
                      <p className="text-2xl font-bold text-yellow-900">12</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">Approved Today</h4>
                      <p className="text-2xl font-bold text-green-900">5</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Leave Types</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span>Vacation</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sick Leave</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maternity</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalData?.type === "employeeTypes" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dashboardData.employeeTypes.map((type) => (
                      <div
                        key={type.name}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4"
                        style={{ borderColor: type.color }}
                      >
                        <h4 className="font-semibold" style={{ color: type.color }}>
                          {type.name}
                        </h4>
                        <p className="text-2xl font-bold text-gray-900">{type.value}</p>
                        <p className="text-sm text-gray-600">{((type.value / 1247) * 100).toFixed(1)}% of workforce</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Employment Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-purple-800">Full-Time Benefits</h5>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• Health Insurance</li>
                          <li>• 401(k) Matching</li>
                          <li>• Paid Time Off</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-cyan-800">Part-Time Benefits</h5>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• Flexible Schedule</li>
                          <li>• Pro-rated PTO</li>
                          <li>• Training Access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalData?.type === "department" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4"
                      style={{ borderColor: modalData.data.color }}
                    >
                      <h4 className="font-semibold" style={{ color: modalData.data.color }}>
                        Total Employees
                      </h4>
                      <p className="text-2xl font-bold text-gray-900">{modalData.data.count}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">Avg Performance</h4>
                      <p className="text-2xl font-bold text-green-900">
                        {dashboardData.performanceMetrics.find((p) => p.department === modalData.data.name)
                          ?.performance || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Department Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span>Senior Level</span>
                        <span className="font-medium">{Math.floor(modalData.data.count * 0.3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mid Level</span>
                        <span className="font-medium">{Math.floor(modalData.data.count * 0.5)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Junior Level</span>
                        <span className="font-medium">{Math.floor(modalData.data.count * 0.2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Open Positions</span>
                        <span className="font-medium">{Math.floor(modalData.data.count * 0.1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalData?.type === "activity" && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {modalData.data.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-semibold text-blue-900">{modalData.data.name}</h4>
                        <p className="text-blue-700">{modalData.data.action}</p>
                        <p className="text-sm text-blue-600">{modalData.data.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Activity Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Activity Type:</span>
                        <span className="font-medium">{modalData.data.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span className="font-medium">
                          {modalData.data.type === "New Hire"
                            ? "Marketing"
                            : modalData.data.type === "Review"
                              ? "Engineering"
                              : "Sales"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-green-600">Completed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority:</span>
                        <span className="font-medium text-orange-600">Normal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(modalData?.type === "hiringTrends" ||
                modalData?.type === "attendance" ||
                modalData?.type === "performance") && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Analytics Summary</h4>
                    <p className="text-indigo-700">
                      {modalData?.type === "hiringTrends" &&
                        "Monthly hiring shows positive growth with 67 new hires in June, exceeding targets by 15%."}
                      {modalData?.type === "attendance" &&
                        "Weekly attendance maintains excellent levels above 95%, with Week 4 showing peak performance at 96.1%."}
                      {modalData?.type === "performance" &&
                        "Department performance metrics show HR leading at 9.1/10, with all departments exceeding 8.5 benchmark."}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Key Insights</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Consistent upward trend</li>
                        <li>• Above industry average</li>
                        <li>• Strong team performance</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Recommendations</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Continue current strategies</li>
                        <li>• Monitor seasonal patterns</li>
                        <li>• Expand successful programs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      )
}

{
  showProfileDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
}
</div>
  )
}

export default Dashboard