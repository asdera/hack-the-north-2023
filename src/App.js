import './App.css';
import {useState, useEffect} from "react";
import Login from './Login.js';

function App() {
  const [page, setPage] = useState("login");

  function GetPage() {
      switch (page) {
        case "login":
          return <Login />;
      }
  }

  return (
      <div className = "App">
          {GetPage()}
      </div>
  );
}

export default App;