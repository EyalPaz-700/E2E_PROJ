import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Layout = ({ setCurrentUser }) => {
  const nav = useNavigate();
  function handleLogout() {
    localStorage.removeItem("currUser");
    setCurrentUser(undefined);
    nav("/login");
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
