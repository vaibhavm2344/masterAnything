import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [receivedData, setReceivedData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);
  const [allCourses, setAllCourse] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          axios.defaults.headers.common["token"] = storedToken;

          const response = await axios.get(
            backendUrl+'/api/user/verify'
          );
          if (response.data.success) {
            setToken(storedToken);
            setUser(response.data.user);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken("");
            setUser(null);
            toast.error("Session expired. Please login again.");
          }
        } catch (error) {
          console.log("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken("");
          setUser(null);
          toast.error("Session expired. Please login again.");
        }
      }
    };
    verifyToken();
  }, [token]);

  const getAllData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/courses');
      setAllCourse(response.data.dataToSend);
      localStorage.setItem('alldata',JSON.stringify(response.data.dataToSend))
    } 
    catch (error) {
      console.error("Error fetching courses:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch courses"
      );
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("alldata");
    setToken("");
    setUser(null);
    delete axios.defaults.headers.common["token"];
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const [selectedContent, setSelectedContent] = useState(null);
  const value = {
    receivedData,
    setReceivedData,
    token,
    setToken,
    showLogin,
    setShowLogin,
    selectedContent,
    setSelectedContent,
    getAllData,
    allCourses,
    user,
    setUser,
    logOut,
    backendUrl
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
