// routes/reports.js
import express from 'express';
const router = express.Router();

const dummyDB = []; // ← temp memory store

router.post('/', (req, res) => {
  const report = req.body;
  dummyDB.push(report); // store in memory
  res.status(201).json({ message: 'Stored in dummy DB', report });
});

router.get('/', (req, res) => {
  res.json(dummyDB);
});

export default router;
