import pool from "../config/database.js"

export const getDashboardData = async (timeframe, department) => {
  try {
    // Get KPI data from database
    const employeeCountQuery = `
      SELECT COUNT(*) as total_employees,
             COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_employees
      FROM employees
      ${department !== "all" ? "WHERE department_id = (SELECT id FROM departments WHERE name = $1)" : ""}
    `

    const attendanceQuery = `
      SELECT COUNT(*) as present_today
      FROM attendance 
      WHERE date = CURRENT_DATE AND status = 'Present'
      ${department !== "all" ? "AND employee_id IN (SELECT id FROM employees WHERE department_id = (SELECT id FROM departments WHERE name = $1))" : ""}
    `

    const leaveQuery = `
      SELECT COUNT(*) as on_leave
      FROM leave_requests 
      WHERE status = 'Approved' 
      AND start_date <= CURRENT_DATE 
      AND end_date >= CURRENT_DATE
      ${department !== "all" ? "AND employee_id IN (SELECT id FROM employees WHERE department_id = (SELECT id FROM departments WHERE name = $1))" : ""}
    `

    const performanceQuery = `
      SELECT AVG(overall_rating) as avg_performance
      FROM performance_reviews 
      WHERE status = 'Completed'
      ${department !== "all" ? "AND employee_id IN (SELECT id FROM employees WHERE department_id = (SELECT id FROM departments WHERE name = $1))" : ""}
    `

    const params = department !== "all" ? [department] : []

    const [employeeResult, attendanceResult, leaveResult, performanceResult] = await Promise.all([
      pool.query(employeeCountQuery, params),
      pool.query(attendanceQuery, params),
      pool.query(leaveQuery, params),
      pool.query(performanceQuery, params),
    ])

    const totalEmployees = Number.parseInt(employeeResult.rows[0].total_employees) || 0
    const presentToday = Number.parseInt(attendanceResult.rows[0].present_today) || 0
    const onLeave = Number.parseInt(leaveResult.rows[0].on_leave) || 0
    const avgPerformance = Number.parseFloat(performanceResult.rows[0].avg_performance) || 8.5

    // Calculate attendance percentage
    const attendanceRate = totalEmployees > 0 ? ((presentToday / totalEmployees) * 100).toFixed(1) : "0.0"

    // Get hiring trends based on timeframe
    const hiringQuery = getHiringTrendsQuery(timeframe)
    const hiringResult = await pool.query(hiringQuery)

    return {
      kpis: {
        totalEmployees: {
          value: totalEmployees,
          change: "+2%",
          period: `from last ${timeframe}`,
        },
        activeToday: {
          value: presentToday,
          percentage: `${attendanceRate}%`,
          label: "attendance rate",
        },
        onLeave: {
          value: onLeave,
          percentage: `${((onLeave / totalEmployees) * 100).toFixed(1)}%`,
          label: "of workforce",
        },
        avgPerformance: {
          value: `${avgPerformance.toFixed(1)}/10`,
          change: "+0.1",
          period: `from last ${timeframe}`,
        },
      },
      monthlyHiring: hiringResult.rows || [],
    }
  } catch (error) {
    console.error("❌ Error in getDashboardData:", error)
    throw error
  }
}

const getHiringTrendsQuery = (timeframe) => {
  switch (timeframe) {
    case "week":
      return `
        SELECT 
          TO_CHAR(hire_date, 'Dy') as period,
          COUNT(*) as hires,
          0 as departures
        FROM employees 
        WHERE hire_date >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY TO_CHAR(hire_date, 'Dy'), EXTRACT(DOW FROM hire_date)
        ORDER BY EXTRACT(DOW FROM hire_date)
      `
    case "quarter":
      return `
        SELECT 
          'Q' || EXTRACT(QUARTER FROM hire_date) as period,
          COUNT(*) as hires,
          0 as departures
        FROM employees 
        WHERE hire_date >= CURRENT_DATE - INTERVAL '1 year'
        GROUP BY EXTRACT(QUARTER FROM hire_date)
        ORDER BY EXTRACT(QUARTER FROM hire_date)
      `
    case "year":
      return `
        SELECT 
          EXTRACT(YEAR FROM hire_date)::text as period,
          COUNT(*) as hires,
          0 as departures
        FROM employees 
        WHERE hire_date >= CURRENT_DATE - INTERVAL '5 years'
        GROUP BY EXTRACT(YEAR FROM hire_date)
        ORDER BY EXTRACT(YEAR FROM hire_date)
      `
    default: // month
      return `
        SELECT 
          TO_CHAR(hire_date, 'Mon') as period,
          COUNT(*) as hires,
          0 as departures
        FROM employees 
        WHERE hire_date >= CURRENT_DATE - INTERVAL '6 months'
        GROUP BY TO_CHAR(hire_date, 'Mon'), EXTRACT(MONTH FROM hire_date)
        ORDER BY EXTRACT(MONTH FROM hire_date)
      `
  }
}

export const getEmployees = async () => {
  const query = `
    SELECT 
      e.id,
      e.employee_id,
      e.first_name,
      e.last_name,
      e.email,
      e.phone,
      e.position,
      e.employee_type,
      e.hire_date,
      e.salary,
      e.status,
      d.name as department_name
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    ORDER BY e.created_at DESC
  `

  const result = await pool.query(query)
  return result.rows
}

export const getDepartments = async () => {
  const query = `
    SELECT 
      d.id,
      d.name,
      d.description,
      d.budget,
      COUNT(e.id) as employee_count
    FROM departments d
    LEFT JOIN employees e ON d.id = e.department_id AND e.status = 'Active'
    GROUP BY d.id, d.name, d.description, d.budget
    ORDER BY employee_count DESC
  `

  const result = await pool.query(query)
  return result.rows.map((dept) => ({
    name: dept.name,
    count: Number.parseInt(dept.employee_count),
    color: getDepartmentColor(dept.name),
  }))
}

const getDepartmentColor = (deptName) => {
  const colors = {
    Health: "#ef4444ff",
    Sales: "#10b981",
    Marketing: "#06b6d4",
    Training: "#f97316",
    Design: "#6366f1",
    Engineering: "#8b5cf6",
    HR: "#ec4899",
    Finance: "#14b8a6",
  }
  return colors[deptName] || "#6b7280"
}

export const getAttendance = async () => {
  const query = `
    SELECT 
      DATE_TRUNC('week', date) as week_start,
      AVG(CASE WHEN status = 'Present' THEN 1.0 ELSE 0.0 END) * 100 as attendance_rate
    FROM attendance 
    WHERE date >= CURRENT_DATE - INTERVAL '5 weeks'
    GROUP BY DATE_TRUNC('week', date)
    ORDER BY week_start
  `

  const result = await pool.query(query)
  return result.rows.map((row, index) => ({
    week: `Week ${index + 1}`,
    attendance: Number.parseFloat(row.attendance_rate).toFixed(1),
  }))
}

export const getPerformance = async () => {
  const query = `
    SELECT 
      d.name as department,
      AVG(pr.overall_rating) as performance
    FROM performance_reviews pr
    JOIN employees e ON pr.employee_id = e.id
    JOIN departments d ON e.department_id = d.id
    WHERE pr.status = 'Completed'
    GROUP BY d.name
    ORDER BY performance DESC
  `

  const result = await pool.query(query)
  return result.rows.map((row) => ({
    department: row.department,
    performance: Number.parseFloat(row.performance).toFixed(1),
  }))
}
