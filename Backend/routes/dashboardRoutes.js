// Backend/routes/dashboardRoutes.js
import express from "express"
import {
  getDashboardData,
  getEmployees,
  getDepartments,
  getAttendance,
  getPerformance,
} from "../controllers/dashboardController.js"

const router = express.Router()

router.get("/data", getDashboardData)
router.get("/employees", getEmployees)
router.get("/departments", getDepartments)
router.get("/attendance", getAttendance)
router.get("/performance", getPerformance)

export default router
