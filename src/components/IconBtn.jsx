//TODO: used with back-arrow / menu / search icons
//*   pass in icon path and callback
//*   callback triggered onClick

import react from "react";
import PropTypes from "prop-types";

const icons = {
  arrow_back: {
    src: "assets/nav/arrow_back.svg",
    alt: "back arrow - clears search query",
  },
  search: {
    src: "assets/nav/search.svg",
    alt: "searches for location",
  },
};

function IconBtn({ icon, type, handleClick }) {
  return (
    <button className="icon-btn" type={type} onClick={handleClick}>
      <img
        className="icon-btn__icon"
        src={icons[icon].src}
        alt={icons[icon].alt}
      />
    </button>
  );
}

IconBtn.propTypes = {
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IconBtn;
