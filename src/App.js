import "./App.css";

import Menu from "./Menu.js";
import Game from "./Game.js";
import Login from "./Login.js";
import Mode from "./Mode.js";
import Customize from "./Customization.js";
import Register from "./Register";

import { useState, useEffect } from "react";
import MainMenu from "./MainMenu";

function App() {
  const [page, setPage] = useState("menu");

  const [game_mode, setGameMode] = useState(-1);

  function GetPage() {
    switch (page) {
      case "login":
        return <Login DidLogIn={TestLogin} BackToMenu={BackToMenu} />;
      case "register":
        return <Register DidRegister={DidRegister} BackToMenu={BackToMenu} />;
      case "menu":
        return <Menu ToLogin={ToLogin} ToRegister={ToRegister} />;
      case "main":
        return (
          <MainMenu
            LogOut={LogOut}
            SelectMode={SelectMode}
            ToCustomize={ToCustomize}
          />
        );
      case "game":
        return <Game game_mode={game_mode} />;
      case "mode":
        return (
          <Mode setGameMode={setGameMode} backToMainMenu={BackToMainMenu} />
        );
      case "customize":
        return <Customize backToMainMenu={BackToMainMenu} />;

      case "register":
        return <Register />;

      default:
        throw Error("Unknown page");
    }
  }

  useEffect(() => {
    if (game_mode !== -1) {
      setPage("game");
    }
  }, [game_mode]);

  useEffect(() => {
    const handleWheel = (e) => e.preventDefault();

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  function TestLogin() {
    // load profile info
    /*
    Username
    Rank Points -> to be converted to rating (i.e Scrubby, Intermediate, Grandmaster, etc)
    All the profile icons that this user has
    Amount of Nuggets (currency)
    */
    console.log("HEys");
    setPage("main");

    // IgnoreWarningForTesting();
  }

  function LogOut() {
    setPage("login");
  }

  function ToLogin() {
    setPage("login");
  }

  function ToCustomize() {
    setPage("customize");
  }

  function ToRegister() {
    setPage("register");
  }

  function SelectMode() {
    setPage("mode");
  }

  function BackToMenu() {
    setPage("menu");
  }

  function BackToMainMenu() {
    setPage("main");
  }

  function DidRegister(id) {
    setPage("menu");
    if (id) {
      alert("registered user with id: " + id);
      // TODO: go to the user's home screen
    } else {
      // login after registration failed. Tell the user to log in again
    }
  }

  return <div className="App">{GetPage()}</div>;
}

export default App;
