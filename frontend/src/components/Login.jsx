import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  let userId;
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      setErrorMessage("please fill username and password");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }),
      };
      try {
        const response = await fetch(
          "http://localhost:3000/login",
          requestOptions
        );
        if (!response.ok) {
          throw "";
        } else {
          const currUser = await response.json();
          console.log(currUser);
          if (Object.keys(currUser).length === 0) {
            alert("username or password incorrect");
          } else {
            localStorage.setItem("currUser", JSON.stringify(currUser));
            localStorage.setItem("loggedIn", "true");
            navigate(`../users/${currUser.user_id}`);
          }
        }
      } catch (error) {
        console.error("");
      }
    }
  }
  return (
    <div>
      <>
        <h1>LogIn</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <br />

          <button type="submit">Login</button>
        </form>
        <p>{errorMessage}</p>
      </>
    </div>
  );
};

export default Login;
