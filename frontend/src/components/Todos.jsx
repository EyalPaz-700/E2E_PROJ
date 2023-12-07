import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [clickedAdd, setClickedAdd] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("ASC");
  let { id } = useParams();

  async function removeTodo(todoId, userId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_deleted: true }),
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
        copy.find((todo) => todo.id === todoId).is_deleted = true;
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

  async function addTodo(e) {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: inputValue, user_id: id }),
    };
    try {
      let data = await fetch(
        `http://localhost:3000/todos/${id}`,
        requestOptions
      );
      if (!data.ok) {
        throw new Error("ADDING FAILED");
      }
      setInputValue("");
      setClickedAdd((prev) => !prev);
      const newTodo = await data.json();
      console.log("newTodo: ", newTodo);
      setTodos((prev) => {
        const copy = [...prev];
        copy.push({ ...newTodo, id: newTodo.todo_id });
        return copy;
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function chooseSortBy(value) {
    const sortBy =
      value === "alphabetically"
        ? "content"
        : value === "completed"
        ? "status"
        : "id";
    setSort(sortBy);
  }
  function sortTodos() {
    const property = sort;
    setTodos((prev) => {
      const copy = [...prev];
      const sorted = copy.sort((a, b) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
      });
      return sorted;
    });
  }
  function handleReverse() {
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newOrder);
    setTodos((prev) => {
      const copy = [...prev];
      return copy.reverse();
    });
  }
  return (
    <>
      <h1>todos</h1>
      <Link to="restore"> Restore Todo's</Link>
      <select onChange={(e) => chooseSortBy(e.target.value)}>
        <option>sort by</option>
        <option value="id">id</option>
        <option value="alphabetically">alphabetically</option>
        <option value="completed">completed</option>
      </select>
      {order === "ASC" ? (
        <button onClick={handleReverse}>⬇</button>
      ) : (
        <button onClick={handleReverse}>⬆</button>
      )}

      <button onClick={sortTodos}>sort</button>
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
      {!clickedAdd ? (
        <button onClick={() => setClickedAdd((prev) => !prev)}>add</button>
      ) : (
        <>
          <form onSubmit={addTodo}>
            <input
              type="text"
              name="content"
              placeholder="content"
              onChange={(e) => handleChange(e)}
            />
            <input type="submit" />
          </form>
        </>
      )}
    </>
  );
};

export default Todos;
