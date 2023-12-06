import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  let { id } = useParams();

  async function getTodos() {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`);
      if (!response.ok) {
        throw "";
      } else {
        const todosArr = await response.json();
        console.log(todosArr);
        setTodos(todosArr);
      }
    } catch {}
  }
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1>todos</h1>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Todos;
