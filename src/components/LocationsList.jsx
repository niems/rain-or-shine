import React from "react";
import PropTypes from "prop-types";

function LocationItems({ list }) {
  if (!list) return null;

  return list.map((item) => (
    <li key={item.id} className="loc-item" id={`item-${item.id}`}>
      {item.name}
    </li>
  ));
}

function LocationsList({ list }) {
  return (
    <ul className="loc-list">
      <LocationItems list={list} />
    </ul>
  );
}

LocationsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      dataCoords: PropTypes.string.isRequired,
    })
  ),
};

export default LocationsList;
