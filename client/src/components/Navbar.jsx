import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/userContext";

const Navbar = () => {
  const { token, getAllData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl text-white/80 cursor-pointer"
      >
        MasterAnything
      </h1>

      <div className="flex gap-5">
        <NavLink to={"/buy"}>
          <p className="pt-1 border-2 border-zinc-400 rounded-full p-2 px-5 cursor-pointer text-white/90 hover:bg-amber-400 hover:text-black">
            Billing
          </p>
        </NavLink>

        <NavLink to={"/courses"}>
          <p
            onClick={() => getAllData()}
            className="pt-1 border-2 border-zinc-400 rounded-full p-2 px-5 cursor-pointer text-white/90 hover:bg-amber-400 hover:text-black"
          >
            Courses
          </p>
        </NavLink>

        <NavLink to={"/chat"}>
          <p
            onClick={() => getAllData()}
            className="pt-1 border-2 border-zinc-400 rounded-full p-2 px-5 cursor-pointer text-white/90 hover:bg-amber-400 hover:text-black"
          >
            Chat
          </p>
        </NavLink>

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-8 rounded-full"
            />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-zinc-600 rounded flex flex-col gap-4 p-4 ">
                <p
                  onClick={() => navigate("/profile")}
                  className="hover:text-black cursor-pointer text-white"
                >
                  Profile
                </p>
                <p className="hover:text-black cursor-pointer text-white">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary px-5 p-2 pt-1 font-semibold hidden md:block text-[#201503] rounded-full bg-[#DFD0B8]"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
