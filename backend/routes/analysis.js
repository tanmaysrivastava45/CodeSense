import express from 'express';
import { 
  analyzeCode, 
  getHistory, 
  deleteAnalysis,
  getAnalysisStats,
  analyzeAllAtOnce
} from '../controllers/analysisController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', authenticate, analyzeCode);
router.post('/analyze-all', authenticate, analyzeAllAtOnce);
router.get('/history', authenticate, getHistory);
router.get('/stats', authenticate, getAnalysisStats);
router.delete('/:id', authenticate, deleteAnalysis);

export default router;
