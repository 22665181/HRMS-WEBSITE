import express from "express";
import pool from "../db.js"; // PostgreSQL connection
const router = express.Router();

// ✅ Handle POST request to submit recognition (JSON only, no file upload)

router.post("/submit", async (req, res) => {
  const {
    recipientName,
    department,
    employeeId,
    jobTitle,
    appreciationType,
    achievement,
    dob,
    message,
    visibility,
    notify,
    allowComment
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO recognitions 
        (recipient_name, department, employee_id, job_title, appreciation_type, achievement, dob, message, visibility, notify, allow_comment)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [
        recipientName,
        department,
        employeeId,
        jobTitle,
        appreciationType,
        achievement,
        dob,
        message,
        visibility,
        notify,
        allowComment
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Recognition Insert Error:", err);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

export default router;
