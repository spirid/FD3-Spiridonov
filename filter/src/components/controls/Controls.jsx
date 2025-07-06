import React from "react";
import PropTypes from "prop-types";

const Controls = ({
  searchText,
  isSorted,
  onInputChange,
  onCheckboxChange,
  onReset,
}) => {
  return (
    <div className="filter-controls">
      <input
        type="text"
        value={searchText}
        onChange={onInputChange}
        placeholder="Введите текст для фильтрации"
      />

      <label>
        <input type="checkbox" checked={isSorted} onChange={onCheckboxChange} />
        Сортировать по алфавиту
      </label>

      <button onClick={onReset}>Сбросить</button>
    </div>
  );
};

Controls.propTypes = {
  searchText: PropTypes.string.isRequired,
  isSorted: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Controls;
