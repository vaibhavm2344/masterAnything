import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/userContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setShowLogin } = useContext(AppContext);
  const onClickHandler = ()=>{
    if(user){
      navigate('/chat')
    }
    else{
      setShowLogin(true)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center text-center my-20 ">
      <h1 className="text-[#948979] text-4xl  mx-auto mt-10 text-center sm:text-4xl myfont">
        Master anything. One plan. Zero overwhelm.
      </h1>

      <div>
        <p className="text-white/60 text-lg max-w-full mt-5">
          Just enter a topic and how many days you have — and we’ll create a
          complete, daily learning plan for you with:
        </p>
        <ul className="flex justify-around px-3 mt-5">
          <li className="bg-zinc-600 p-3 rounded-full text-white/80">
            Curated theory articles
          </li>
          <li className="bg-zinc-600 p-3 rounded-full text-white/80">
            Best YouTube videos
          </li>
          <li className="bg-zinc-600 p-3 rounded-full text-white/80">
            Practice problems from top coding platforms
          </li>
        </ul>
      </div>
      <button
        onClick={onClickHandler}
        className="text-[#201503] mt-15 rounded-full bg-[#DFD0B8] font-semibold px-8 py-3 text-xl cursor-pointer hover:scale-105 transition-all duration-500"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
