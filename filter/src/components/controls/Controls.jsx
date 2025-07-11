import React from "react";
import PropTypes from "prop-types";

class Controls extends React.Component {
  render() {
    const { searchText, isSorted, onInputChange, onCheckboxChange, onReset } =
      this.props;

    return (
      <div className="filter-controls">
        <input
          type="text"
          value={searchText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Введите текст для фильтрации"
        />

        <label>
          <input
            type="checkbox"
            checked={isSorted}
            onChange={(e) => onCheckboxChange(e.target.checked)}
          />
          Сортировать по алфавиту
        </label>

        <button onClick={onReset}>Сбросить</button>
      </div>
    );
  }
}

Controls.propTypes = {
  searchText: PropTypes.string.isRequired,
  isSorted: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Controls;
