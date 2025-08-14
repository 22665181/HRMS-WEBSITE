const pool = require('../db');

const createRecognition = async (recipient, type, details) => {
  const result = await pool.query(
    'INSERT INTO recognition (recipient, type, details) VALUES ($1, $2, $3) RETURNING *',
    [recipient, type, details]
  );
  return result.rows[0];
};

module.exports = {
  createRecognition,
};
