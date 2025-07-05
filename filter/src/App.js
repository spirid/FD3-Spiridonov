import React from "react";
import Filter from "./components/filter/Filter";

class App extends React.Component {
  render() {
    const words = [
      "california",
      "everything",
      "aboveboard",
      "washington",
      "basketball",
      "weathering",
      "characters",
      "literature",
      "contraband",
      "appreciate",
    ];

    return (
      <div className="app">
        <h1 style={{ textAlign: "center" }}>Фильтр слов</h1>
        <Filter wordsList={words} />
      </div>
    );
  }
}

export default App;
