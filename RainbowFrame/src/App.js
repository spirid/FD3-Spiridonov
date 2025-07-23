import React from "react";
import RainbowFrame from "./components/rainbowFrame/RainbowFrame";

class App extends React.Component {
  render() {
    let colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "#00BFFF",
      "blue",
      "purple",
    ];

    return (
      <div className="app">
        <RainbowFrame colors={colors}>Hello!</RainbowFrame>
      </div>
    );
  }
}

export default App;
