import React from "react";
import PropTypes from 'prop-types';

import Square from "./Square";

function SquareRow(props) {
  let { data, animateData } = props;
  return (
    <div className="square-row">
      {data.map((number, index) => (
        <Square
          key={index}
          number={number}
          animateStatus={animateData[index]}
        />
      ))}
    </div>
  );
}

SquareRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number), 
  animateData: PropTypes.arrayOf(PropTypes.bool)
}

export default SquareRow;
