import React, { useState, useEffect } from "react";
import { addTaskToDB, getTasksFromDB, deleteTaskFromDB } from "./db";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await getTasksFromDB();
      setTasks(savedTasks);
    };
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!newTask) return;
    const task = { id: Date.now(), text: newTask };
    setTasks([...tasks, task]);
    setNewTask("");
    await addTaskToDB(task);
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    await deleteTaskFromDB(id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Offline To-Do App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}{" "}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
