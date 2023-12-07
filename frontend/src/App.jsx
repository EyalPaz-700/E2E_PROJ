import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Posts from "./components/Posts";
import ChosenPost from "./components/ChosenPost";
import Todos from "./components/Todos";
import ToDoHistory from "./components/ToDoHistory";

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currUser")
      ? JSON.parse(localStorage.getItem("currUser"))
      : undefined
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route path="/users/:id">
            <Route path="home" element={<Home />} />
            <Route path="todos" element={<Todos />} />
            <Route path="todos/restore" element={<ToDoHistory />} />
          </Route>
          <Route path="posts">
            <Route index element={<Posts currentUser={currentUser} />} />
            <Route
              path=":postId"
              element={<ChosenPost currentUser={currentUser} />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
