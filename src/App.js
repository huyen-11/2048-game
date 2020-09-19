import React, { Component } from "react";

import axios from "axios";
import { bounceIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";

import "./App.css";
import GameLogic from "./components/GameLogic";
import SquareRow from "./components/SquareRow";
import SquareContainer from "./components/SquareContainer";
import { CounterContext, CounterProvider } from "./components/Counter";
import Header from "./components/Header";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: GameLogic.data,
      won: false,
      lose: false,
      score: 0,
      endgame: false,
      players: [],
      value: ""
    };
    this.handleKeydown = this.handleKeydown.bind(this);
    this.restart = this.restart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  restart() {
    GameLogic.restart();
    this.refreshGameState();
    document.addEventListener("keydown", this.handleKeydown);
  }
  refreshGameState() {
    if (GameLogic.won || GameLogic.lose) {
      document.removeEventListener("keydown", this.handleKeydown);
    }
    this.setState({
      data: GameLogic.data,
      won: GameLogic.won,
      lose: GameLogic.lose,
      score: GameLogic.score,
      endgame: GameLogic.endgame
    });
  }
  handleKeydown(event) {
    const keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right"
    };
    //if click in an arrow
    if (keyMap[event.code] && GameLogic.response(keyMap[event.code])) {
      this.refreshGameState();
    }
  }
  componentDidMount() {
    axios
      .get("https://jsonserver-huyen.herokuapp.com/players?_sort=time")
      .then((response) => {
        this.setState({
          players: response.data
        });
      })
      .catch((error) => {
        this.setState({
          players: [
            {
              name: "Huyen o",
              time: 558,
              id: 1
            },
            {
              name: "huynies",
              time: 639,
              id: 2
            },
            {
              name: "hhmije",
              time: 783,
              id: 3
            }
          ]
        });
      });
    document.addEventListener("keydown", this.handleKeydown);
    GameLogic.start();
    this.refreshGameState();
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  submitPlayer(count) {
    axios({
      method: "post",
      url: "https://jsonserver-huyen.herokuapp.com/players",
      data: {
        name: this.state.value,
        time: count
      }
    })
      .then((response) => {
        window.location.replace("/");
      })
      .catch((error) => {
        window.location.replace("/");
      });
  }
  render() {
    const { won, lose, score, endgame, players } = this.state;
    const styles = StyleSheet.create({
      bounceIn: {
        animationName: bounceIn,
        animationDuration: "1.5s",
        animationDelay: "0s"
      }
    });

    return (
      <CounterProvider endgame={endgame}>
        <div className="App">
          <Header
            score={score}
            endgame={endgame}
            restart={this.restart}
            players={players}
          />
          {(won || lose) && (
            <CounterContext.Consumer endgame={endgame}>
              {({ count, refreshCounter }) => (
                <div className={"flex end-game " + css(styles.bounceIn)}>
                  <div>{won ? "You win!" : "Game over!"}</div>
                  <div className="final-time">Time: {count}s</div>
                  <div
                    className="retry-button hover"
                    onClick={() => {
                      this.restart();
                      refreshCounter();
                    }}
                  >
                    Restart
                  </div>
                  {won && <form onSubmit={() => this.submitPlayer(count)}>
                    <input
                      className="retry-button l-input"
                      placeholder="Add your name to leaderboard"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </form>}
                </div>
              )}
            </CounterContext.Consumer>
          )}
          <SquareContainer
            arr={[0, 1, 2, 3]}
            renderRow={(item, index) => (
              <SquareRow
                key={index}
                data={GameLogic.dataGroupRow(index)}
                animateData={GameLogic.animateDataGroupRow(index)}
              />
            )}
          ></SquareContainer>
          <div className="game-explain">
            <b> HOW TO PLAY </b>: Use your <b>arrow keys</b> to move the tiles.
            When two tiles with the same number touch, they{" "}
            <b>merge into one!</b> Your target title is <b>2048</b> in the
            shortest time.
          </div>
        </div>
      </CounterProvider>
    );
  }
}
