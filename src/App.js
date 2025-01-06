// ----------------------INDEXDB_STORAGE_VERSION----------------------------------

// import React, { useState, useEffect } from 'react';
// import { addTaskToDB, getTasksFromDB, deleteTaskFromDB } from './db';
// import "./App.css";


// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   useEffect(() => {
//     const loadTasks = async () => {
//       const savedTasks = await getTasksFromDB();
//       setTasks(savedTasks);
//     };
//     loadTasks();
//   }, []);

//   const addTask = async () => {
//     if (!newTask) return;
//     const task = { id: Date.now(), text: newTask };
//     setTasks([...tasks, task]);
//     setNewTask('');
//     await addTaskToDB(task);
//   };

//   const deleteTask = async (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//     await deleteTaskFromDB(id);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Offline To-Do App</h1>
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         placeholder="Add a task"
//       />
//       <button onClick={addTask}>Add Task</button>
//       <ul>
//         {tasks.map(task => (
//           <li key={task.id}>
//             {task.text} <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// ----------------------LOCAL_STORAGE_VERSION----------------------------------

// import React, { useState, useEffect } from "react";

// const App = () => {
  //   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   // Load tasks from localStorage on initial render
//   useEffect(() => {
  //     const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //     setTasks(savedTasks);
  //   }, []);
  
  //   // Save tasks to localStorage whenever they change
  //   useEffect(() => {
    //     localStorage.setItem("tasks", JSON.stringify(tasks));
    //   }, [tasks]);
    
    //   // Add a new task
    //   const addTask = () => {
      //     if (newTask.trim() === "") return; // Prevent adding empty tasks
      //     const newTaskObj = {
//       id: Date.now(),
//       text: newTask,
//       completed: false,
//     };
//     setTasks([...tasks, newTaskObj]);
//     setNewTask(""); // Clear the input
//   };

//   // Delete a task
//   const deleteTask = (id) => {
  //     const updatedTasks = tasks.filter((task) => task.id !== id);
  //     setTasks(updatedTasks);
  //   };
  
  //   // Toggle task completion
  //   const toggleCompletion = (id) => {
    //     const updatedTasks = tasks.map((task) =>
      //       task.id === id ? { ...task, completed: !task.completed } : task
  //     );
  //     setTasks(updatedTasks);
  //   };
  
  //   return (
    //     <div className="app-container">
    //       <h1>Offline To-Do App</h1>
    //       <div className="input-container">
    //         <input
    //           type="text"
    //           value={newTask}
    //           onChange={(e) => setNewTask(e.target.value)}
    //           placeholder="Add a task"
    //         />
    //         <button onClick={addTask}>Add Task</button>
    //       </div>
    //       <ul className="task-list">
    //         {tasks.map((task) => (
      //           <li key={task.id} className={task.completed ? "completed" : ""}>
      //             <span onClick={() => toggleCompletion(task.id)} style={{ cursor: "pointer" }}>
      //               {task.text}
      //             </span>
      //             <button onClick={() => deleteTask(task.id)}>Delete</button>
      //           </li>
      //         ))}
      //       </ul>
      //       <div className="footer">
      //         <p>
      //           Built with ❤️ by <a href="https://yourportfolio.com" target="_blank">You</a>
      //         </p>
      //       </div>
      //     </div>
      //   );
      // };
      
      // export default App;
      
      
      
      
      
// ----------------------INDEXDB_STORAGE_VERSION_with_to----------------------------------

import React, { useState, useEffect } from "react";
import { addTodo, getTodos, updateTodo, deleteTodo } from "./db";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTasks(todos);
  };

  const handleAddTask = async () => {
    if (task.trim()) {
      await addTodo({ title: task, completed: false });
      setTask("");
      fetchTodos();
    }
  };

  const toggleComplete = async (id) => {
    const todo = tasks.find((t) => t.id === id);
    await updateTodo(id, { completed: !todo.completed });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="app">
      <h1>Offline Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(task.id)}>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
