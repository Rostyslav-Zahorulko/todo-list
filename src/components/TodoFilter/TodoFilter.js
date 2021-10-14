const TodoFilter = ({ value, onFilterTodos }) => (
  <label>
    Filter todos
    <input type="text" value={value} onChange={onFilterTodos} />
  </label>
);

export default TodoFilter;
