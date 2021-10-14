const TodoCounter = ({ todosTotalCount, completedTodosCount }) => {
  return (
    <>
      <p>Todos: {todosTotalCount}</p>
      <p>Completed todos: {completedTodosCount}</p>
    </>
  );
};

export default TodoCounter;
