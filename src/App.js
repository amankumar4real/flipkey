import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import NavBar from "./Compoenents/common/NavBar"

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes />
    </div>
  );
}

export default App;
