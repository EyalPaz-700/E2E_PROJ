import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  return (
    <div>
      <h6>hi {currUser.username}</h6>
    </div>
  );
};

export default Home;
