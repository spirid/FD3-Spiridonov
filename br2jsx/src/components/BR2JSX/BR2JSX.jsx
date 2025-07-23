import React from "react";

class BR2JSX extends React.Component {
  render() {
    const { text } = this.props;

    if (!text) return null;

    const lines = text.split(/<br\s*\/?>/i);

    // 1.
    // const elements = [];
    // for (let i = 0; i < lines.length; i++) {
    //   if (lines[i]) {
    //     elements.push(lines[i]);
    //   }
    //   if (i < lines.length - 1) {
    //     elements.push(<br key={`br-${i}`} />);
    //   }
    // }

    // 2.
    // const elements = lines
    //   .map((line, i) => {
    //     const result = [];
    //     if (line) result.push(line);
    //     if (i < lines.length - 1) result.push(<br key={`br-${i}`} />);
    //     return result;
    //   })
    //   .flat();

    const elements = lines.flatMap((line, i) =>
      [
        line ? line : null,
        i < lines.length - 1 ? <br key={`br-${i}`} /> : null,
      ].filter(Boolean)
    );

    return <div className="br2jsx">{elements}</div>;
  }
}

export default BR2JSX;
