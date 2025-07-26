import React from "react";
import DoubleButton from "./components/doubleButton/DoubleButton";
import { withRainbowFrame } from "./components/rainbowFrame/RainbowFrame";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];
const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

class App extends React.Component {
  handleButtonClick = (num) => {
    alert(num);
  };

  render() {
    return (
      <div>
        <DoubleButton
          caption1="однажды"
          caption2="пору"
          cbPressed={this.handleButtonClick}
        >
          в студёную зимнюю
        </DoubleButton>

        <FramedDoubleButton
          caption1="я из лесу"
          caption2="мороз"
          cbPressed={this.handleButtonClick}
        >
          вышел, был сильный
        </FramedDoubleButton>
      </div>
    );
  }
}

export default App;
