import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [newtask, setNewtask] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  const handleFetchAllTasks = async () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`).then((res) => {
      setAllTasks(res.data);
    });
  };

  const handleCreateNewTask = async () => {
    if (newtask === "") return;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
        title: newtask,
        completed: false,
      })
      .then(() => {
        handleFetchAllTasks();
        setNewtask("");
      });
  };

  const handleCheckTask = async (id) => {
    const task = allTasks.find((task) => task._id === id);
    if (!task) return;
    const taskStatus = task.completed;
    setAllTasks(
      allTasks.map((task) => {
        if (task._id === id) {
          task.completed = !taskStatus;
        }
        return task;
      })
    );
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
        completed: !taskStatus,
      })
      .then(() => {
        handleFetchAllTasks();
      });
  };

  const handleDeleteTask = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`)
      .then(() => {
        handleFetchAllTasks();
      });
  };

  useEffect(() => {
    handleFetchAllTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the TODO list</h1>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="text"
            id="taskTextInput"
            placeholder="Enter your task"
            onChange={(v) => setNewtask(v.target.value)}
            value={newtask}
          />
          <button id="addButton" onClick={handleCreateNewTask}>
            Add
          </button>
        </div>
        <div
          id="allTasks"
          style={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {allTasks.map((task) => (
            <div key={task._id} style={{ display: "flex", gap: "5px" }}>
              <input
                type="checkbox"
                id={`taskCheckbox${task._id}`}
                checked={task.completed}
                onChange={() => handleCheckTask(task._id)}
              />
              <span id={task._id}>{task.title}</span>
              <button
                id={`deleteButton${task._id}`}
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
