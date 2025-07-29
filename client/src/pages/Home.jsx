import React, { useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../../context/userContext";

const Home = () => {
  const { setShowLogin } = useContext(AppContext);
  setShowLogin(true);
  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
