import React from "react";

class BR2JSX extends React.Component {
  render() {
    const { text } = this.props;

    if (!text) return null;

    const lines = text.split(/<br\s*\/?>/i);

    const elements = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) {
        elements.push(lines[i]);
      }
      if (i < lines.length - 1) {
        elements.push(<br key={`br-${i}`} />);
      }
    }

    return (
      <div className="br2jsx" style={{ whiteSpace: "pre-line" }}>
        {elements}
      </div>
    );
  }
}

export default BR2JSX;
