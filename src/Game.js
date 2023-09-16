import "./Game.css";

import React from "react";

export var MY_COLOR = "white"
export var OPPONENT_COLOR = MY_COLOR === "white" ? "black" : "white";
export var BOARD_SIZE = 8

function Game() {
  return <div className="Game"></div>;
}

export default Game;
