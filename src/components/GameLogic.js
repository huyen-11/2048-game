class GameLogic {
    constructor() {
      this.data = [];
      this.won = false;
      this.lose = false;
      this.score = 0;
      this.endgame = false;
      // those two for detect animate square
      this.draftmergedNumber = [];
      this.mergedNumber = [];
    }
    start() {
      this.init();
    }
  
    restart() {
      this.init();
      this.won = false;
      this.lose = false;
      this.score = 0;
      this.endgame = false;
      this.draftmergedNumber = [];
      this.mergedNumber = [];
    }
    init() {
      this.data = Array(16).fill(0);
      this.generateBlock(this.data);
      this.generateBlock(this.data);
    }
    dataGroupRow(i) {
      return this.data.slice(4 * i, 4 * i + 4);
    }
    dataGroupColumn(i) {
      return this.data.filter((item, index) => index % 4 === i);
    }
    animateDataGroupRow(i) {
      return this.mergedNumber.slice(4 * i, 4 * i + 4);
    }
    merge(arr) {
      arr = arr.filter((item) => item !== 0);
      let result = [];
      this.draftmergedNumber = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
          result.push(arr[i] * 2);
          this.draftmergedNumber.push(true);
          this.score += arr[i];
          i++;
        } else {
          result.push(arr[i]);
          this.draftmergedNumber.push(false);
        }
      }
      return result;
    }
    eachRow(i, dataGroup, method) {
      let result = this.merge(this[dataGroup](i));
      while (result.length < 4) {
        result[method](0);
      }
      while (this.draftmergedNumber.length < 4) {
        this.draftmergedNumber[method](false);
      }
      return result;
    }
    updateRow(dataGroup, method) {
      let result = [];
      for (let i = 0; i < 4; i++) {
        let arr = this.eachRow(i, dataGroup, method);
        result = [...result, ...arr];
        this.mergedNumber = [...this.mergedNumber, ...this.draftmergedNumber];
      }
      return result;
    }
    updateColumn(dataGroup, method) {
      let result = Array(16).fill(null);
      this.mergedNumber = Array(16).fill(null);
      for (let i = 3; i >= 0; i--) {
        let arr = this.eachRow(i, dataGroup, method);
        result[i] = arr[0];
        result[i + 4] = arr[1];
        result[i + 8] = arr[2];
        result[i + 12] = arr[3];
        this.mergedNumber[i] = this.draftmergedNumber[0];
        this.mergedNumber[i + 4] = this.draftmergedNumber[1];
        this.mergedNumber[i + 8] = this.draftmergedNumber[2];
        this.mergedNumber[i + 12] = this.draftmergedNumber[3];
      }
      //return result instead
      return result;
    }
    right() {
      this.mergedNumber = [];
      //update eachRow to new array after merging
      let result = this.updateRow("dataGroupRow", "unshift");
      return this.dispatch(result);
    }
    left() {
      this.mergedNumber = [];
      let result = this.updateRow("dataGroupRow", "push");
      return this.dispatch(result);
    }
    up() {
      this.mergedNumber = [];
      let result = this.updateColumn("dataGroupColumn", "push");
      return this.dispatch(result);
    }
    down() {
      this.mergedNumber = [];
      let result = this.updateColumn("dataGroupColumn", "unshift");
      return this.dispatch(result);
    }
    dispatch(mergedArr) {
      //dispatch new square and check endgame
      if (JSON.stringify(mergedArr) === JSON.stringify(this.data)) {
        return false;
      }
      if (this.hasEmptySquare(mergedArr)) {
        this.generateBlock(mergedArr);
        if (this.checkLose()) {
          this.lose = true;
          this.endgame = true;
        }
        if (this.checkWon()) {
          this.won = true;
          this.endgame = true;
        }
      }
      return true;
    }
    response(keymap) {
      // check user direction and game status
      return this[keymap]();
    }
    checkWon() {
      return this.data.indexOf(2048) !== -1;
    }
    checkLose() {
      if (this.hasEmptySquare(this.data)) {
        return false;
      }
      //check opposite side
      if (
        JSON.stringify(this.updateRow("dataGroupRow", "push")) ===
          JSON.stringify(this.data) &&
        JSON.stringify(this.updateColumn("dataGroupColumn", "push")) ===
          JSON.stringify(this.data)
      ) {
        return true;
      }
    }
    hasEmptySquare(arr) {
      if (arr.indexOf(0) !== -1) {
        return true;
      }
      return false;
    }
    generateBlock(result) {
      //  add a new square to result & place in data
      let addedArray = [];
      for (let i = 0; i <= 16; i++) {
        if (result[i] === 0) {
          addedArray.push(i);
        }
      }
      let randomIndex = addedArray[Math.floor(Math.random() * addedArray.length)];
      result[randomIndex] = [2, 4][Math.floor(Math.random() * 2)];
      this.data = result;
    }
  }
export default new GameLogic();
  