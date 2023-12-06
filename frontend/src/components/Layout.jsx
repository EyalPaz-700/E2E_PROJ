import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

const Layout = () => {
  function handleLogout() {
    localStorage.removeItem("currUser");
    localStorage.setItem("loggedIn", "false");
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="./home">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="./todos">Todos</Link>
          </li>
        </ul>
        <button onClick={handleLogout}>
          <Link to="/login">log out</Link>
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
