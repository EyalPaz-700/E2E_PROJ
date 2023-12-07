import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import "../navbar.css";
const Layout = ({ currentUser, setCurrentUser }) => {
  const nav = useNavigate();
  function handleLogout() {
    localStorage.removeItem("currUser");
    setCurrentUser(undefined);
    nav("/login");
  }
  return (
    <>
      <nav className="navbar">
        <div>
          <Link to={`users/${currentUser.user_id}/todos`}>Home</Link>
        </div>
        <div>
          <Link to="/posts">Posts</Link>
        </div>
        <div>
          <Link to={`/users/${currentUser.user_id}/todos`}>Todos</Link>
        </div>

        <div>
          <Link onClick={handleLogout} to="/login">
            Logout
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
