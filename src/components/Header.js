import React, { useState } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import { CounterContext } from "./Counter";
import closeIcon from "../assets/cancel.svg";

export default function Header(props) {
  const [display, setDisplay] = useState(false);

  const { score, endgame, restart, players } = props;
  return (
    <div className="header">
      <div className="flex logo">2048 </div>
      <div className="column">
        <div className="score-board">
          <div>Score</div>
          <div className="score">{score}</div>
        </div>
        <CounterContext.Consumer endgame={endgame}>
          {({ refreshCounter }) => (
            <div
              className="flex option hover"
              onClick={() => {
                restart();
                refreshCounter();
                setDisplay(false);
              }}
            >
              Restart
            </div>
          )}
        </CounterContext.Consumer>
      </div>
      <div className="column">
        <div className="score-board">
          <div>Time</div>
          <CounterContext.Consumer endgame={endgame}>
            {({ count }) => (
              <div className="score">
                {count}
              </div>
            )}
          </CounterContext.Consumer>
        </div>
        <div className="flex option hover" onClick={() => setDisplay(!display)}>
          Leaderboard
        </div>
      </div>
      {/* Leaderboard rank */}
      <div
        className={classNames("flex end-game leaderboard", {
          displayNone: display === false
        })}
      >
        <div className="flex l-title">
          <div>Leaderboard</div>
          <div
            className="flex close-icon hover"
            onClick={() => setDisplay(!display)}
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>
        {players.map((player, index) => (
          <div className="cart-item" key={player.id}>
            <div className="flex rank">{index + 1}</div>
            <div className="name">{player.name}</div>
            <div>{player.time + "s"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Header.propTypes = {
  score: PropTypes.number, 
  endgame:PropTypes.bool, 
  restart: PropTypes.func, 
  players: PropTypes.arrayOf(PropTypes.object)
}
