import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import analysisRoutes from './routes/analysis.js';
import collaborationRoutes from './routes/collaboration.js';
import { initializeSocket } from './socket/socketServer.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Initialize Socket.io
initializeSocket(httpServer);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/collaboration', collaborationRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeSense API - By Tanmay Srivastava',
    status: 'running',
    features: ['Code Analysis', 'Real-time Collaboration'],
    powered_by: 'Google Gemini 2.5 Flash + Socket.io'
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 CodeSense Server running on port ${PORT}`);
  console.log(`📡 REST API: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`⚡ Powered by Gemini 2.5 Flash + Socket.io`);
});
