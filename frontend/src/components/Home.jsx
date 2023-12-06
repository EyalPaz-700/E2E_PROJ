import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // if (!JSON.parse(localStorage.getItem("loggedIn"))) {
  //   navigate("../login");
  // }
  const currUser = localStorage.getItem("currUser");
  return (
    <div>
      <h6>hi {currUser.name}</h6>
    </div>
  );
};

export default Home;
