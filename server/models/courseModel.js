import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  mainTopic: {
    type: String,
    required: true,
  },
  subtopics: {
    type: [String],
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    // unique: true,
  },
  days: {
    type: [subtopicSchema],
    required: true,
  },
});

const courseModel = mongoose.model.Course || mongoose.model("Course", courseSchema);

export default courseModel;
