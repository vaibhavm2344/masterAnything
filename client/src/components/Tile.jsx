import React from "react";

const Tile = ({ day, mainTopic, subtopics }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 w-full md:w-80 lg:w-96 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        Day {day}: {mainTopic}
      </h2>
      <h3 className="text-lg font-semibold text-gray-700">Subtopics:</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        {subtopics.map((subtopic, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-blue-500">•</span>
            <span>{subtopic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tile;
