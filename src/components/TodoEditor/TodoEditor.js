import { Component } from 'react';

class TodoEditor extends Component {
  state = {
    text: '',
  };

  handleInputChange = e => {
    this.setState({ text: e.currentTarget.value });
  };

  handleFormSubmit = e => {
    const { text } = this.state;
    const { onAddTodo } = this.props;

    e.preventDefault();

    if (text) {
      onAddTodo(text);

      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
          Enter todo text
          <input type="text" value={text} onChange={this.handleInputChange} />
        </label>
        <button type="submit">Create todo</button>
      </form>
    );
  }
}

export default TodoEditor;
