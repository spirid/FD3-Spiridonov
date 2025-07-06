import React from "react";
import PropTypes from "prop-types";

const List = ({ items }) => {
  return (
    <ul className="items-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default List;
