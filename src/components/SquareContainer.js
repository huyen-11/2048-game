import React from "react";
import PropTypes from 'prop-types';

import "./Square.css";

function SquareContainer({ arr, renderRow }) {
  return (
    <div className="square-container">
      {arr.map((item, index) => renderRow(item, index))}
    </div>
  );
}

SquareContainer.propTypes = {
  arr: PropTypes.array,
  renderRow: PropTypes.func, 
}
export default SquareContainer;
