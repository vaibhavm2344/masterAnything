import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";


const PORT = process.env.PORT || 3000

const app = express();

// middleware
app.use(express.json());
app.use(cors());

await connectDB();

app.use('/api/courses', courseRouter)
app.use('/api/user',userRouter)

app.listen(PORT, () => {
  console.log("Server is Running...");
});
