import { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  constructor() {
    super();

    console.log('Modal Constructor');
  }

  componentDidMount() {
    console.log('Modal Did Mount');

    window.addEventListener('keydown', this.handleEscapePress);
  }

  componentWillUnmount() {
    console.log('Modal Will Unmount');

    window.removeEventListener('keydown', this.handleEscapePress);
  }

  handleEscapePress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    console.log('Modal Render');

    const { children } = this.props;

    return (
      <div className={s.backdrop} onClick={this.handleBackdropClick}>
        <div className={s.modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
