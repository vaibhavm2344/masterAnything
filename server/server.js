import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";
import { rateLimit } from 'express-rate-limit'

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 50, 
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
	ipv6Subnet: 56,
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// Connect to database
try {
  await connectDB();
} catch (error) {
  console.error('Failed to start server:', error);
}

app.use('/api/courses', courseRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}...`);
});
