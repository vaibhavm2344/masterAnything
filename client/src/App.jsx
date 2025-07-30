import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import BuyCredits from "./pages/BuyCredits";
import Course from "./components/Course";
import { AppContext } from "../context/userContext";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';

function App() {
  const { showLogin} = useContext(AppContext);

  return (
    <div className="px-6 min-h-screen bg-zinc-800">
      <ToastContainer position='top-right'/>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:topic" element={<Course />} />
        <Route path="/buy" element={<BuyCredits />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
