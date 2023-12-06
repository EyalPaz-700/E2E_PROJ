import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Posts from "./components/Posts";
import ChosenPost from "./components/ChosenPost";
import Todos from "./components/Todos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path=":postId" element={<ChosenPost />} />
          </Route>
          <Route path="todos" element={<Todos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
