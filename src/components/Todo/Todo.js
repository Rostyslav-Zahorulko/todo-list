import s from './Todo.module.css';

const Todo = ({ text, completed, onDeleteTodo, onUpdateTodo }) => (
  <>
    <input type="checkbox" checked={completed} onChange={onUpdateTodo} />
    <p className={s.text}>{text}</p>
    <button type="button" onClick={onDeleteTodo}>
      Delete
    </button>
  </>
);

export default Todo;
