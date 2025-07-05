import React from "react";
import "./Filter.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isSorted: false,
    };

    if (!this.props.wordsList) {
      console.error('Проп "items" обязателен для компонента Filter');
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleCheckboxChange = (e) => {
    this.setState({ isSorted: e.target.checked });
  };

  handleReset = () => {
    this.setState({
      searchText: "",
      isSorted: false,
    });
  };

  getFilteredItems() {
    const { wordsList } = this.props;
    const { searchText, isSorted } = this.state;

    let filteredItems = wordsList.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isSorted) {
      filteredItems = [...filteredItems].sort((a, b) => a.localeCompare(b));
    }

    return filteredItems;
  }

  render() {
    const { searchText, isSorted } = this.state;
    const filteredItems = this.getFilteredItems();

    return (
      <div className="filter">
        <div className="filter-controls">
          <input
            type="text"
            value={searchText}
            onChange={this.handleInputChange}
            placeholder="Введите текст для фильтрации"
          />

          <label>
            <input
              type="checkbox"
              checked={isSorted}
              onChange={this.handleCheckboxChange}
            />
            Сортировать по алфавиту
          </label>

          <button onClick={this.handleReset}>Сбросить</button>
        </div>

        <ul className="items-list">
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Filter;
