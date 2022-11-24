import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxTasks,
  selectTasksDependingOnCompletedOrNot,
  selectTasksToAddLeft,
  showCompletedToggle,
} from "./store/tasks/selectors";
import { useState } from "react";
import {
  addTask,
  markAsCompleted,
  deleteTask,
  toggleCompleted,
  changeMax,
} from "./store/tasks/slice";

function App() {
  const tasks = useSelector(selectTasksDependingOnCompletedOrNot);
  const maxTasks = useSelector(selectMaxTasks);
  const tasksToAddLeft = useSelector(selectTasksToAddLeft);
  const showCompleted = useSelector(showCompletedToggle);
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (tasksToAddLeft === 0) {
      alert("Reached the tasks limit");
      setNewTask("");
    } else {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  return (
    <div className="App">
      <h1>Tasks: </h1>
      <p>
        Show completed:{" "}
        <button onClick={() => dispatch(toggleCompleted())}>
          {showCompleted ? "🟢" : "⚫"}
        </button>
      </p>

      <ul>
        {tasks
          ? tasks.map((t) => (
              <li key={t.id}>
                <h3>
                  {t.task}{" "}
                  {t.completed ? (
                    "✅"
                  ) : (
                    <button onClick={() => dispatch(markAsCompleted(t.id))}>
                      ⌛
                    </button>
                  )}
                  <button onClick={() => dispatch(deleteTask(t.id))}>🗑️</button>
                </h3>
              </li>
            ))
          : "Loading..."}
      </ul>
      <div>
        <p>Maximum tasks: {maxTasks}</p>
        <div>
          <input
            type="range"
            min="1"
            max="99"
            value={useSelector(selectMaxTasks)}
            onInput={(e) => {
              dispatch(changeMax(e.target.value));
            }}
            id="myRange"
          ></input>
        </div>
        <p>Tasks to add left: {tasksToAddLeft} </p>
        <form onSubmit={submit}>
          <h2>Add new task: </h2>
          <p>
            <label>
              Task:
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </label>
          </p>
          <p>
            <button type="submit">Add this task!</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
