import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import analysisRoutes from './routes/analysis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeSense API - By Tanmay Srivastava',
    status: 'running',
    powered_by: 'Google Gemini 2.5 Flash'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CodeSense Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}`);
  console.log(`⚡ Powered by Gemini 2.5 Flash`);
});
