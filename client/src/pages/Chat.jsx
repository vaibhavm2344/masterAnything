import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import { toast } from 'react-toastify';

const Chat = () => {
  const [input, setInput] = useState("");
  const [days, setDays] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const { setReceivedData } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/courses/generate",
        {
          inputPrompt: input,
          inputDays: days,
        }
      );
      setReceivedData(data.data);
      setInput("");
      setDays(0);
      navigate("/courses");
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
    finally {
    setLoading(false); 
  }
  };
  return (
    <div className="flex h-[80vh] m-auto justify-center items-center">
      {loading ? <div className="loader pb-30"></div> : 
      <div className="pb-30">
        <p className="text-5xl text-white/80 changing">
          Start mastering something new today.
        </p>
      </div>}

      <form action="" className="fixed bottom-8 flex gap-5 z-10">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter a topic (e.g., React, DSA, Python, Machine Learning)"
          className="text-xl p-5 rounded-full w-150 bg-zinc-700 placeholder-color"
        />
        <input
          onChange={(e) => setDays(e.target.value)}
          value={days}
          type="number"
          name=""
          id=""
          placeholder="Number of days"
          className="p-5 rounded-full w-50 bg-zinc-700 text-xl placeholder-color"
        />

        <button
          onClick={handleSubmit}
          className="bg-zinc-700 rounded-full p-5 cursor-pointer text-white"
        >
          Generate Plan
        </button>
      </form>
    </div>
  );
};

export default Chat;
