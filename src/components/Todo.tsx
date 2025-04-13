import React, { useState, FormEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";

// import our custom theme styles
import './theme-provider/themes.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string
}

interface Theme {
  onThemeToggle?: () => void;
}

const Todo: React.FC<Theme> = ({ onThemeToggle }) => {

  // List with todo tasks
  const [todos, setTodos] = useState<Task[]>([])

  // Input value from form tag
  const [inputValue, setInputValue] = useState<string>("");

  // function of adding task
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь добавить логику добавления задачи

    // creating date
    let normalDate = new Date()

    // data for task
    const todoItem: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      date: normalDate.toISOString().split('T')[0]
    }

    if (inputValue) {
      setTodos([...todos, todoItem])
    }

    setInputValue("");
  };

  // function of changing task's complete boolean
  const handleCompleted = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // function of deleting task
  const handleDelete = (id: number) => {
    setTodos(todos.filter((elem: any) => elem.id !== id))
  }

  return (
    <div className='todo-container'>
      <div className='todo-header'>
        <h1>Список задач</h1>
        <ThemeToggle onClick={onThemeToggle} />
      </div>

      <form className='input-section' onSubmit={handleSubmit}>
        <input
          type='text'
          className='task-input'
          placeholder='Введите новую задачу'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='add-button'>
          Добавить
        </button>
      </form>

      <div className='tasks-list'>
        {todos.map((elem: Task) => {
          return (
            <div className="task-item" key={elem.id}>
              <div className="task-info">
                <p>{elem.text}</p>
              <span>{elem.date}</span>
              </div>
              <div className="task-options">
                <input type="checkbox" checked={elem.completed} onChange={() => handleCompleted(elem.id)} />
                <button onClick={() => handleDelete(elem.id)}>Удалить</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Todo;
