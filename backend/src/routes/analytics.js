import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Placeholder routes - implement as needed
router.get('/dashboard', protect, (req, res) => {
  res.json({ success: true, data: {} });
});

export default router;