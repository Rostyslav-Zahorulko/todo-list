import Todo from '../Todo';
import s from './TodoList.module.css';

const TodoList = ({ todos, onDeleteTodo, onUpdateTodo }) => (
  <ul className={s.list}>
    {todos.map(({ id, text, completed }) => (
      <li key={id} className={s.listItem}>
        <Todo
          id={id}
          text={text}
          completed={completed}
          onDeleteTodo={() => onDeleteTodo(id)}
          onUpdateTodo={() => onUpdateTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
