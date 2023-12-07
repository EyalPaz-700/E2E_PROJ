import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Todo = ({ todo, removeSelf }) => {
  let { id } = useParams();
  const [todoStatus, setTodoStatus] = useState(todo.status === 1);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [submittedEdit, setSubmittedEdit] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  async function handleCheck() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !todoStatus }),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}/${todo.id}`,
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
      console.error(error);
    }
  }

  async function handleEdit() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: inputValue }),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}/${todo.id}`,
        requestOptions
      );
      if (!response.ok) {
        throw "error";
      } else {
        const res = await response.json();
        console.log("res: ", res);
      }
    } catch (error) {
      console.error(error, "");
    }
  }
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmitEdit = () => {
    setSubmittedEdit((prev) => !prev);
    setClickedEdit((prev) => !prev);
    handleEdit();
  };

  return (
    <>
      {clickedEdit ? (
        <>
          <input value={inputValue} onChange={handleChange} />
          <br />
          <button onClick={handleSubmitEdit}>submit</button>
          <button onClick={() => setClickedEdit((prev) => !prev)}>
            cancel
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            id={todo.id}
            value={todo.content}
            checked={todoStatus}
            onChange={() => {
              handleCheck(todo.id, todo.status);
            }}
          />
          <label htmlFor={todo.id}>{inputValue}</label>
          <button onClick={removeSelf}>Remove</button>
          <button onClick={() => setClickedEdit((prev) => !prev)}>✏️</button>
        </>
      )}
    </>
  );
};

export default Todo;
