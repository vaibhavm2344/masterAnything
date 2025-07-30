import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Connect to database
try {
  await connectDB();
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

app.use('/api/courses', courseRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}...`);
});
