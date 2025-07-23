import React from "react";

class RainbowFrame extends React.Component {
  render() {
    let content = this.props.children;

    this.props.colors.forEach((color) => {
      content = (
        <div style={{ border: `5px solid ${color}`, padding: "10px" }}>
          {content}
        </div>
      );
    });

    return <div className="rainbow-frame">{content}</div>;
  }
}

export default RainbowFrame;
