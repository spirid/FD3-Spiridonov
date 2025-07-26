import React from "react";

class DoubleButton extends React.Component {
  handleClick = (num) => {
    this.props.cbPressed(num);
  };

  render() {
    return (
      <div>
        <input
          type="button"
          value={this.props.caption1}
          onClick={() => this.handleClick(1)}
        />
        {this.props.children}
        <input
          type="button"
          value={this.props.caption2}
          onClick={() => this.handleClick(2)}
        />
      </div>
    );
  }
}

export default DoubleButton;
