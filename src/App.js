import './App.css';
import {useState, useEffect} from "react";

function App() {
  const [page, setPage] = useState("menu");

  function GetPage() {
      switch (page) {
        // swap page
      }
  }

  useEffect(() => {
      if (game_mode !== -1) {
          setPage('game')
      }
  }, [game_mode]);

  return (
      <div className = "App">
          {GetPage()}
      </div>
  );
}

export default App;