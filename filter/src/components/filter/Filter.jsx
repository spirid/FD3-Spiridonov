import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls/Controls";
import List from "../list/List";
import "./Filter.css";

class Filter extends React.Component {
  static propTypes = {
    wordsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isSorted: false,
      filteredItems: props.wordsList || [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.isSorted !== this.state.isSorted ||
      prevProps.wordsList !== this.props.wordsList
    ) {
      this.updateFilteredItems();
    }
  }

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

  render() {
    const { searchText, isSorted, filteredItems } = this.state;

    return (
      <div className="filter">
        <Controls
          searchText={searchText}
          isSorted={isSorted}
          onInputChange={this.handleInputChange}
          onCheckboxChange={this.handleCheckboxChange}
          onReset={this.handleReset}
        />
        <List items={filteredItems} />
      </div>
    );
  }
}

export default Filter;
