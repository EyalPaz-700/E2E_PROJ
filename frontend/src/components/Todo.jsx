import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Todo = ({ todo, removeSelf }) => {
  let { id } = useParams();
  const [todoStatus, setTodoStatus] = useState(todo.status === 1);

  async function handleCheck(todoId, status) {
    console.log("status: ", status);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !todoStatus }),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}/${todoId}`,
        requestOptions
      );
      if (!response.ok) {
        throw "error";
      } else {
        const res = await response.json();
        console.log("res: ", res);

        setTodoStatus((prev) => !prev);
      }
    } catch (error) {
      console.error(error, "");
    }
  }

  return (
    <>
      <label htmlFor={todo.id}>{todo.content}</label>
      <input
        type="checkbox"
        id={todo.id}
        value={todo.content}
        checked={todoStatus}
        onChange={() => {
          handleCheck(todo.id, todo.status);
        }}
      />
      <button onClick={removeSelf}>Remove</button>
    </>
  );
};

export default Todo;
