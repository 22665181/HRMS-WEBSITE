import * as dashboardModel from "../models/dashboardModel.js"

export const getDashboardData = async (req, res, next) => {
  try {
    const { timeframe = "month", department = "all" } = req.query
    console.log(`📊 Fetching dashboard data for timeframe: ${timeframe}, department: ${department}`)

    const data = await dashboardModel.getDashboardData(timeframe, department)

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data,
    })
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error)
    next(error)
  }
}

export const getEmployees = async (req, res, next) => {
  try {
    console.log("👥 Fetching employees data...")
    const employees = await dashboardModel.getEmployees()

    res.status(200).json({
      success: true,
      message: "Employees data fetched successfully",
      data: employees,
    })
  } catch (error) {
    console.error("❌ Error fetching employees:", error)
    next(error)
  }
}

export const getDepartments = async (req, res, next) => {
  try {
    console.log("🏢 Fetching departments data...")
    const departments = await dashboardModel.getDepartments()

    res.status(200).json({
      success: true,
      message: "Departments data fetched successfully",
      data: departments,
    })
  } catch (error) {
    console.error("❌ Error fetching departments:", error)
    next(error)
  }
}

export const getAttendance = async (req, res, next) => {
  try {
    console.log("📅 Fetching attendance data...")
    const attendance = await dashboardModel.getAttendance()

    res.status(200).json({
      success: true,
      message: "Attendance data fetched successfully",
      data: attendance,
    })
  } catch (error) {
    console.error("❌ Error fetching attendance:", error)
    next(error)
  }
}

export const getPerformance = async (req, res, next) => {
  try {
    console.log("📈 Fetching performance data...")
    const performance = await dashboardModel.getPerformance()

    res.status(200).json({
      success: true,
      message: "Performance data fetched successfully",
      data: performance,
    })
  } catch (error) {
    console.error("❌ Error fetching performance:", error)
    next(error)
  }
}
