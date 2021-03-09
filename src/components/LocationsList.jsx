import React from "react";
import PropTypes from "prop-types";

//* renders the list of locations from the search api
function LocationItems({ list }) {
  if (!list) return null;

  return list.map((item) => (
    <li key={item.id} className="loc-item" id={item.id}>
      {item.name}
    </li>
  ));
}

function LocationsList({ list, handleSelect }) {
  return (
    <ul className="loc-list" onClick={handleSelect}>
      <LocationItems list={list} />
    </ul>
  );
}

LocationsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      dataCoords: PropTypes.object.isRequired,
    })
  ),
  handleSelect: PropTypes.func.isRequired,
};

export default LocationsList;
