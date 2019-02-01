import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { name, type, classButton, ariadisable = true, disabled = false } = this.props;
    return (
     <button 
      disabled={disabled}
      type={type}
      onClick={this.props.action}
      aria-disabled={ariadisable}
      className={classButton}>
      {name}</button>
    );
  }
}

export default Button;