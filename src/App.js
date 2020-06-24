import React, { useState } from "react";
import "./App.css";

function Todo({ item, completeTodo, deleteTodo }) {
  return (
    <div
      style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
      className="todo"
    >
      {item.text}
      <div>
        <button onClick={() => completeTodo(item)}>Complete</button>
        <button onClick={() => deleteTodo(item)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Add new todo here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn about React",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Meet friend for launch",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Build todo app",
      isCompleted: true,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];

    setTodos(newTodos);
  };

  const completeTodo = (item) => {
    const newTodos = [...todos];
    const index = newTodos.indexOf(item);
    newTodos[index] = { ...newTodos[index] };
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = (item) => {
    const newTodos = [...todos];
    const index = newTodos.indexOf(item);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            item={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          ></Todo>
        ))}
        <TodoForm addTodo={addTodo}></TodoForm>
      </div>
    </div>
  );
}

export default App;
