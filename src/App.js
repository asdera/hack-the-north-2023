import "./App.css";

import Menu from "./Menu.js";
import Game from "./Game.js";
import Login from "./Login.js";
import Mode from "./Mode.js";
import Customize from "./Customization.js";
import Register from "./Register.js";
import Purchase from "./Purchase";
import GameOrganizerEngine from "./GameOrganizerEngine";
import { useAuth } from "./AuthContext";

import "./CreateFirebaseEngine";

import { useState, useEffect } from "react";
import MainMenu from "./MainMenu";

function App() {
  const [page, setPage] = useState("login");

  const [game_id, setGameId] = useState("");
  const [user_id, setUserId] = useState("");
  const [game_mode, setGameMode] = useState(-1);
  const { currentUser, didLogIn, didRegister, logOut, authEngine } = useAuth();

  console.log(currentUser);

  function GetPage() {
    switch (page) {
      case "login":
        return (
          <Login
            auth_engine={authEngine}
            DidLogIn={DidLogIn}
            BackToMenu={BackToMenu}
          />
        );
      case "register":
        return (
          <Register
            auth_engine={authEngine}
            DidRegister={DidRegister}
            BackToMenu={BackToMenu}
          />
        );
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
      case "purchase":
        return <Purchase setPage={setPage} />;
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

  function DidLogIn(user_id) {
    didLogIn(user_id);
    setPage("main");
    // Existing code ...
  }

  function DidRegister(id) {
    didRegister(id);
    setPage("menu");
    // Existing code ...
  }

  function TestLogin() {
    // load profile info
    /*
    Username
    Rank Points -> to be converted to rating (i.e Scrubby, Intermediate, Grandmaster, etc)
    All the profile icons that this user has
    Amount of Nuggets (currency)
    */

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

  return <div className="App">{GetPage()}</div>;
}

export default App;
