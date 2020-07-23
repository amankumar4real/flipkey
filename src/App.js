import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Compoenents/common/Navbar"
import Search from "./Compoenents/common/Search"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes />
    </div>
  );
}

export default App;
