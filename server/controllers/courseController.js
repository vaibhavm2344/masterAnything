import Course from "../models/courseModel.js";
import { GoogleGenAI } from "@google/genai";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
// import { ObjectId } from "mongodb"

const getUserId = async(req,res)=>{
  const {userId} = req.body;
  if (!userId) {
    return res.json({ success: false, message: "User ID not found" });
  }
  const user = await userModel.findById(userId).select('-password');
   if(!user){
      return res.json({ success: false, message: "User not found" }); 
    }
  console.log(user.courses)
}


export const getCourseByTopic = async (req, res) => {
  try {
    const {id} = req.params;
    // const newId = mongoose.Types.ObjectId(id)
    // console.log(id)
    const course = await Course.findById(id);
    // console.log(course)

    if (!course)
      return res.json({ success: false, message: "Course not found" });
    // console.log(course)
    res.json(course);
  } catch (err) {
    res.json({
      success: false,
      message: "Error fetching course",
      error: err.message,
    });
  }
};

export const generateCourse = async (req, res) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.KEY,
  });

  try {
    const userMessage = req.body;
    // const userInput = userMessage.inputPrompt
    // const foundCourse = await Course.findOne({ userInput });

    // if(foundCourse){
    //   console.log("Already exits")
    //   return res.json({success:false,message: "Course already exists"})
    // }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert tutor and curriculum designer. Your task is to create a structured learning plan in JSON format.
                    I will provide a topic to learn and the number of days for the plan.
                    And please dont add any extra quotes before or after json object.
                    Your response MUST be a JSON object with a double key 'Topic eg.(HTML, DSA, Devops)' and days. The value of 'Topic' should be an heading like (HTML, DSA, Devops), where each object represents a day. Each day object MUST have a 'day' key (a number), a 'mainTopic' key (a string), and a 'subtopics' key (an array of strings).
                    Topic: ${userMessage.inputPrompt}
                    Number of days: ${userMessage.inputDays}
                    Example of the desired JSON format:
                    {
                      topic : "eg.(HTML, DSA, Devops)"
                      days : [
                        {
                          "day": 1,
                          "mainTopic": "Introduction to HTML",
                          "subtopics": [
                            "What is HTML?",
                            "HTML Document Structure",
                            "Basic HTML Tags",
                            "Semantic HTML"
                          ]
                        },
                        {
                          "day": 2,
                          "mainTopic": "Getting Started with CSS",
                          "subtopics": [
                            "What is CSS?",
                            "Selectors and Properties",
                            "The Box Model",
                           "Flexbox Fundamentals"
                         ]
                        }
                    ]
                }`,
            },
          ],
        },
      ],
    });

    const rawJsonString = response.candidates[0].content.parts[0].text;

    const parsedData = JSON.parse(rawJsonString);
    // console.log(parsedData)
    const { topic, days } = parsedData;
    const newCourse = new Course({ topic, days });
    await newCourse.save();

    // get user
    const {userId} = req.body;
    const user = await userModel.findById(userId)
    user.courses.push(newCourse._id)
    await user.save()

    // console.log(newCourse._id)

    res.json({
      success: true,
      message: "Course saved successfully",
      data : parsedData
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: "Error generating course",
      error: err.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {

    const {userId} = req.body;
    const user = await userModel.findById(userId).populate("courses");
    const dataToSend = []
    user.courses.map(course => dataToSend.push({topic :course.topic,id :course._id}));
    // console.log(dataToSend)

    res.json({ success: true, dataToSend });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
