import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Controls from "../controls/Controls";
import List from "../list/List";
import "./Filter.css";

const Filter = ({ wordsList }) => {
  const [searchText, setSearchText] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [filteredItems, setFilteredItems] = useState(wordsList);

  useEffect(() => {
    let result = wordsList.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isSorted) {
      result = [...result].sort((a, b) => a.localeCompare(b));
    }

    setFilteredItems(result);
  }, [searchText, isSorted, wordsList]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsSorted(e.target.checked);
  };

  const handleReset = () => {
    setSearchText("");
    setIsSorted(false);
  };

  return (
    <div className="filter">
      <Controls
        searchText={searchText}
        isSorted={isSorted}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onReset={handleReset}
      />
      <List items={filteredItems} />
    </div>
  );
};

Filter.propTypes = {
  wordsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;
