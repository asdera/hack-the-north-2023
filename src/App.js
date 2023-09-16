import "./App.css";

import Menu from "./Menu.js";
import Game from "./Game.js";
import Login from "./Login.js";
import Register from "./Register.js";

import { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("menu");

  const [game_mode, setGameMode] = useState(-1);

  function GetPage() {
    switch (page) {
      case "menu":
        return <Menu ToLogin={ToLogin} ToRegister={ToRegister} />;

      case "login":
        return <Login />;

      case "game":
        return <Game />;

      case "register":
        return <Register />

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

  function ToLogin() {
    setPage("login");
  }

  function ToRegister() {
    setPage("register");
  }
  function BackToMenu() {
    setPage("menu");
  }

  switch (page) {
    case "login":
      return <Login BackToMenu={BackToMenu} />;
  }

  return <div className="App">{GetPage()}</div>;
}

export default App;
