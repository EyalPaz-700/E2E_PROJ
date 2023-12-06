import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState(undefined);
  const [todoStatus, setTodoStatus] = useState(todo.status);

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

  async function handleCheck(todoId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(!todoStatus),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}/${todoId}`,
        requestOptions
      );
      if (!response.ok) {
        throw "";
      } else {
        const newStatus = await response.json();
        console.log(newStatus);
        setTodoStatus(newStatus);
      }
    } catch (error) {
      console.error("");
    }
  }

  return (
    <>
      <h1>todos</h1>
      <ul>
        {todos.length != 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.id}
              <input
                type="checkbox"
                value={todo.content}
                checked={todo.status}
                onChange={() => {
                  handleCheck(todoStatus);
                }}
              />
            </li>
          ))
        ) : (
          <h5>your todos list is empty</h5>
        )}
      </ul>
    </>
  );
};

export default Todos;
