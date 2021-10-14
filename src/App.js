import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './components/Container';
import TodoCounter from './components/TodoCounter';
import TodoEditor from './components/TodoEditor';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import Modal from './components/Modal';

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      filter: '',
      isOpen: false,
    };

    console.log('App Constructor');
  }

  componentDidMount() {
    console.log('App Did Mount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App Did Update');

    const previousTodos = prevState.todos;
    const currentTodos = this.state.todos;

    // console.log('previousTodos: ', previousTodos);

    // console.log('currentTodos: ', currentTodos);

    // console.log(
    //   'previousTodos !== currentTodos: ',
    //   previousTodos !== currentTodos,
    // );

    if (previousTodos !== currentTodos) {
      const stringifiedTodos = JSON.stringify(currentTodos);

      localStorage.setItem('todos', stringifiedTodos);
    }
  }

  deleteTodo = todoId => {
    console.log(`Todo with ${todoId} was deleted`);

    // this.setState(prevState => {
    //   return {
    //     todos: prevState.todos.filter(todo => {
    //       return todo.id !== todoId;
    //     }),
    //   };
    // });

    // this.setState(({ todos }) => {
    //   console.log('todos: ', todos);

    //   return {
    //     todos: todos.filter(({ id }) => id !== todoId),
    //   };
    // });

    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== todoId),
    }));
  };

  updateTodo = todoId => {
    console.log(`Todo with ${todoId} was updated`);

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id !== todoId ? todo : { ...todo, completed: !todo.completed },
      ),
    }));
  };

  addTodo = todoText => {
    const todo = {
      id: uuidv4(),
      text: todoText,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [...todos, todo],
    }));

    console.log(`Todo with ${todo.id} was added`);
  };

  filterTodos = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce((acc, { completed }) => (completed ? acc + 1 : acc), 0);
  };

  getFilteredTodos = () => {
    const { todos, filter } = this.state;

    const lowercasedFilter = filter.toLowerCase();

    return todos.filter(({ text }) =>
      text.toLowerCase().includes(lowercasedFilter),
    );
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    console.log('App Render');

    const { todos, filter, isOpen } = this.state;

    const todosTotalCount = todos.length;
    const completedTodosCount = this.calculateCompletedTodos();
    const filteredTodos = this.getFilteredTodos();

    return (
      <Container>
        <h1>My Todo List</h1>
        <TodoCounter
          todosTotalCount={todosTotalCount}
          completedTodosCount={completedTodosCount}
        />
        <TodoEditor onAddTodo={this.addTodo} />
        <TodoFilter value={filter} onFilterTodos={this.filterTodos} />
        {todos.length > 0 ? (
          <TodoList
            todos={filteredTodos}
            onDeleteTodo={this.deleteTodo}
            onUpdateTodo={this.updateTodo}
          />
        ) : null}
        {isOpen && (
          <Modal onClose={this.toggleModal}>
            <h2>Modal title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit iure amet dolorem! Necessitatibus non, blanditiis
              possimus alias unde quod perspiciatis autem aperiam deleniti sequi
              laudantium, error expedita veniam similique dolorum ducimus in?
              Ratione nihil quisquam illo? At ut animi dolore sed quibusdam ipsa
              repellendus sit eligendi quidem, ipsam aliquid delectus.
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )}
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
      </Container>
    );
  }
}

export default App;
