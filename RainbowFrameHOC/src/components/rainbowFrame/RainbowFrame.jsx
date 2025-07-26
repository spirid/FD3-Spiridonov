import React from "react";

export const withRainbowFrame = (colors) => (Component) => {
  return class extends React.Component {
    render() {
      let content = <Component {...this.props} />;

      colors.forEach((color) => {
        content = (
          <div style={{ border: `5px solid ${color}`, padding: "10px" }}>
            {content}
          </div>
        );
      });

      return content;
    }
  };
};
