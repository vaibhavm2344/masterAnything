import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Course = () => {
  const { topic } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:3000/api/courses/${topic}`);
      setCourseData(res.data);
    };
    fetchCourse();
  }, [topic]);

  return (
    courseData && (
      <div className="p-6 rounded-xl shadow-lg pt-0">
        <h1 className="text-2xl font-bold mb-4 text-white flex justify-center ">
          Course : {courseData.topic}
        </h1>
        <div className="w-full flex justify-around bg-zinc-500 rounded-lg p-4 mb-5">
          <div>
            <p className="text-xl text-white">Progress</p>
            <p className="text-lg">
              3 <span className="text-sm">/15</span>{" "}
              <span className="text-sm">completed</span>
            </p>
          </div>
          <div>
            <p className="text-xl text-white">Easy</p>
            <p className="text-lg">
              1 <span className="text-sm">/5</span>{" "}
              <span className="text-sm">completed</span>
            </p>
          </div>
          <div>
            <p className="text-xl text-white">Medium</p>
            <p className="text-lg">
              1 <span className="text-sm">/5</span>{" "}
              <span className="text-sm">completed</span>
            </p>
          </div>
          <div>
            <p className="text-xl text-white">Hard</p>
            <p className="text-lg">
              1 <span className="text-sm">/5</span>{" "}
              <span className="text-sm">completed</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {courseData.days.map((dayItem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-5 transform transition-transform duration-300 hover:shadow-xl"
            >
              <h4 className="text-2xl font-bold text-blue-700 mb-2">
                Day {dayItem.day}: {dayItem.mainTopic}
              </h4>
              <h3 className="text-lg font-semibold text-gray-700">
                Subtopics:
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {dayItem.subtopics.map((sub, i) => (
                  <li key={i} className="flex items-center">
                    <input type="checkbox" className="mr-2 text-blue-500" />
                    <p>{sub}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Course;
