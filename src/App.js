import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Components/common/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes />
    </div>
  );
}

export default App;
