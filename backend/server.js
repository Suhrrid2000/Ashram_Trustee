import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import eventRoutes from './routes/events.js'; 
import feedbackRoutes from './routes/feedbacks.js';
import announcementRoutes from './routes/announcements.js';


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const PORT = process.env.PORT || 5001;
const URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      ///useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit if DB fails
  }
};

connectDB();

// Routes
app.use('/api/events', eventRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/announcements", announcementRoutes);


// Root test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


