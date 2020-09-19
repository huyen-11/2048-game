import React from "react";
import classNames from "classnames";
import { zoomIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import PropTypes from 'prop-types';

import "./Square.css";

export default function Square(props) {
  let { number, animateStatus } = props;

  const styles = StyleSheet.create({
    zoomIn: {
      animationName: zoomIn,
      animationDuration: "0.5s",
      animationDelay: "0s"
    }
  });
  return (
    <div
      className={
        classNames("square", {
          "square-0": number === 0,
          "square-2": number === 2,
          "square-4": number === 4,
          "square-8": number === 8,
          "square-16": number === 16,
          "square-32": number === 32,
          "square-64": number === 64,
          "square-128": number === 128,
          "square-256": number === 256,
          "square-512": number === 512,
          "square-1024": number === 1024,
          "square-2048": number === 2048
        }) +
        " " +
        css(animateStatus === true && styles.zoomIn)
      }
    >
      {number}
    </div>
  );
}

Square.propTypes = {
  number: PropTypes.number, 
  animateStatus: PropTypes.bool
}
