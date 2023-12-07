import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Todo from "./Todo";

const ToDoHistory = () => {
  const [todos, setTodos] = useState([]);
  const { id } = useParams();

  async function restoreTodo(todoId, userId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_deleted: false }),
    };
    try {
      let data = await fetch(
        `http://localhost:3000/todos/${userId}/${todoId}`,
        requestOptions
      );
      if (!data.ok) {
        throw new Error("DELETION FAILED");
      }
      setTodos((prev) => {
        const copy = [...prev];
        copy.find((todo) => todo.id === todoId).is_deleted = false;
        return copy;
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function getTodos() {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      } else {
        const todosArr = await response.json();
        console.log(todosArr);
        setTodos(todosArr);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1>Todos Restore</h1>
      <ul>
        {todos.map((todo) =>
          todo.is_deleted ? (
            <li key={todo.id}>
              <h3>{todo.content}</h3>
              <button
                onClick={() => {
                  restoreTodo(todo.id, todo.user_id);
                }}
              >
                Restore
              </button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </>
  );
};

export default ToDoHistory;
