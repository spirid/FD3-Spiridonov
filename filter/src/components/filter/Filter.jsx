import React from "react";
import PropTypes from "prop-types";
import "./Filter.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isSorted: false,
      filteredItems: props.wordsList || [],
    };
  }

  static propTypes = {
    wordsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ searchText: value }, this.updateFilteredItems);
  };

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState({ isSorted: checked }, this.updateFilteredItems);
  };

  handleReset = () => {
    this.setState(
      {
        searchText: "",
        isSorted: false,
      },
      this.updateFilteredItems
    );
  };

  updateFilteredItems = () => {
    const { wordsList } = this.props;
    const { searchText, isSorted } = this.state;

    let filteredItems = wordsList.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isSorted) {
      filteredItems = [...filteredItems].sort((a, b) => a.localeCompare(b));
    }

    this.setState({ filteredItems });
  };

  render() {
    const { searchText, isSorted, filteredItems } = this.state;

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
