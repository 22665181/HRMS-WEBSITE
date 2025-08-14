// recognitionController.js or route file
const { createRecognition } = require('../models/recognitionModel');

const handleRecognition = async (req, res) => {
  try {
    const { recipient, type, details } = req.body;
    const result = await createRecognition(recipient, type, details);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create recognition' });
  }
};