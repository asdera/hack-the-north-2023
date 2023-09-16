import "./App.css";

import Menu from "./Menu.js";
import Game from "./Game.js";
import Login from "./Login.js";

import { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("menu");

  const [game_mode, setGameMode] = useState(-1);

  function GetPage() {
    switch (page) {
      case "menu":
        return <Menu />;

      case "login":
        return <Login />;

      case "game":
        return <Game />;

      default:
        throw Error("Unknown page");
    }
  }

  useEffect(() => {
    if (game_mode !== -1) {
      setPage("game");
    }
  }, [game_mode]);

  function BackToMainMenu() {
    setPage("main");
  }

  useEffect(() => {
    const handleWheel = (e) => e.preventDefault();

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  switch (page) {
    case "login":
      return <Login />;
  }

  return <div className="App">{GetPage()}</div>;
}

export default App;
