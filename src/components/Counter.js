import React, { Component } from "react";
import PropTypes from 'prop-types';

export const CounterContext = React.createContext();

export class CounterProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
    this.refreshCounter = this.refreshCounter.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
  }
  componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.endgame === true) {
      console.log("shouldCompoUpdate");
      if (nextState.count === 0) {
        return true;
      }
      this.stopCounter();
      if (this.props.value !== "") {
        return true;
      }
      return false;
    }
    return true;
  }
  stopCounter() {
    clearInterval(this.timeId);
  }
  refreshCounter() {
    this.stopCounter();
    this.setState({
      count: 0
    });
    this.timeId = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  render() {
    return (
      <CounterContext.Provider
        value={{
          count: this.state.count,
          refreshCounter: this.refreshCounter,
          stopCounter: this.stopCounter
        }}
      >
        {this.props.children}
      </CounterContext.Provider>
    );
  }
}

CounterProvider.propTypes = {
  endgame: PropTypes.bool
}
