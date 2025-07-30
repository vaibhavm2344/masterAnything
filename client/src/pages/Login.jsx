import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const { setShowLogin,setToken, setUser } = useContext(AppContext);

  const onSubmitHandler = async (e)=>{
      e.preventDefault();
      try {
        if(state === 'Login'){
          const {data} = await axios.post(`http://localhost:3000/api/user/login`, {email,password})
          if(data.success){
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          }
          else{
            toast.error(data.message)
          }
        }
        else{
          const {data} = await axios.post('http://localhost:3000/api/user/register', {name,email,password})
          if(data.success){
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          }
          else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        console.error('Login/Register error:', error);
        toast.error(error.response?.data?.message || error.message || 'An error occurred')
      }
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return ()=>{
            document.body.style.overflow = 'unset';
        }
    },[])

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">
          Welcome back! Please {state !== "Login" ? "Sign up" : "Login"} to
          continue
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm"
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email id"
            required
            className="outline-none text-sm"
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
          />
        </div>

        {state !== "Login" ? (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forget Password?
          </p>
        ) : (
          <p className="my-4"></p>
        )}
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() =>
            setShowLogin(false)
            // navigate("/");
          }
        />
      </form>
    </div>
  );
};

export default Login;
