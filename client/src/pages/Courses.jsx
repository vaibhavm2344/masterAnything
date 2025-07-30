import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Courses = () => {
  const { allCourses,getAllData } = useContext(AppContext);
  // const [allCourses, setAllCourse] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllData();
  }, []);

  return allCourses && (
    <div>
      <h1 className="text-5xl font-extrabold text-gray-100 mb-12 text-center drop-shadow-md">
        Your Personalized Learning Plan
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {allCourses.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(`/courses/${item}`)}
              className="bg-zinc-600 p-5 rounded-xl flex justify-center cursor-pointer hover:scale-105 transition-all duration-400 "
            >
              <h1 className="text-2xl text-white">{item}</h1>
            </div>
          );
        })}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
      </div>
    </div>
  ) 
};

export default Courses;
