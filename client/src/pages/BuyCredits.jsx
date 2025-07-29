import React from "react";
import { payment } from "../assets/assets";
const BuyCredits = () => {
  return (
    <div className="min-h-[80vh] text-center pt-2 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 text-white">
        Our Plan
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10 text-white">
        Choose the plan
      </h1>

      <div className="flex gap-6 flex-wrap justify-center text-left">
        {payment.map((plan, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <p className="mt-3 mb-1 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${plan.price}</span>/{" "}
              {plan.credits} credits
            </p>
            <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits;
