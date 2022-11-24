import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maxTasks: 20,
  allTasks: [
    { id: 1, task: "Pick up new glasses", completed: true },
    { id: 2, task: "Buy airco", completed: false },
    { id: 3, task: "Take packages to return", completed: false },
    { id: 4, task: "Order dog food", completed: true },
  ],
  showCompletedTasks: false,
};
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Math.floor(Math.random() * 100),
        task: action.payload,
        completed: false,
      };
      state.allTasks = [...state.allTasks, newTask];
    },
    markAsCompleted: (state, action) => {
      state.allTasks = state.allTasks.map((t) =>
        t.id === action.payload ? { ...t, completed: true } : t
      );
    },
    deleteTask: (state, action) => {
      state.allTasks = state.allTasks.filter((t) => t.id !== action.payload);
    },
    toggleCompleted: (state) => {
      state.showCompletedTasks = !state.showCompletedTasks;
    },
    changeMax: (state, action) => {
      state.maxTasks = action.payload;
    },
  },
});

export const {
  addTask,
  markAsCompleted,
  deleteTask,
  toggleCompleted,
  changeMax,
} = tasksSlice.actions;

export default tasksSlice.reducer;
