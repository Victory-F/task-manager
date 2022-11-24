export const selectTasks = (reduxState) => reduxState.tasks.allTasks;
export const selectMaxTasks = (reduxState) => reduxState.tasks.maxTasks;
export const selectTasksToAddLeft = (reduxState) =>
  selectMaxTasks(reduxState) - selectTasks(reduxState).length;
export const showCompletedToggle = (reduxState) =>
  reduxState.tasks.showCompletedTasks;
export const selectTasksDependingOnCompletedOrNot = (reduxState) => {
  const tasks = showCompletedToggle(reduxState)
    ? selectTasks(reduxState)
    : selectTasks(reduxState).filter((t) => !t.completed);
  return tasks;
};
