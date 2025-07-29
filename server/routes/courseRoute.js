import express from "express";
import { getCourseByTopic, generateCourse, getAllCourses } from "../controllers/courseController.js";
import userAuth from "../middleware/auth.js";

const courseRouter = express.Router();


courseRouter.get("/:topic", getCourseByTopic);       // GET /api/courses/HTML
courseRouter.post("/generate", generateCourse);       // POST /api/courses/generate
courseRouter.get("/", getAllCourses);                   // GET /api/courses/

export default courseRouter;
