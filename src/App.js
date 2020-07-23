import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Compoenents/common/Navbar"
import Login from './Compoenents/Auth/Login'
import Search from './Compoenents/common/Search'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Search/>
      <Login />
      <Routes />
    </div>
  );
}

export default App;
