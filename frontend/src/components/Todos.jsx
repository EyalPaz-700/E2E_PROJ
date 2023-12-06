import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  let { id } = useParams();

  async function removeTodo(todoId, userId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_deleted: true }),
    };
    let data = await fetch(
      `http://localhost:3000/todos/${userId}/${todoId}`,
      requestOptions
    );
    if (!data.ok) {
      return console.error("DELETION FAILED");
    }
    setTodos((prev) => {
      const copy = [...prev];
      copy.find((todo) => todo.id === todoId).is_deleted = true;
      return copy;
    });
  }

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
        {todos.map(
          (todo) =>
            !todo.is_deleted && (
              <li key={todo.id}>
                <Todo
                  removeSelf={() => removeTodo(todo.id, todo.user_id)}
                  todo={todo}
                />
              </li>
            )
        )}
      </ol>
    </>
  );
};

export default Todos;
