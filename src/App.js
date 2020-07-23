import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Components/common/Navbar"
import LangingPage from './Components/landing/landingPage'
import Vacation from './Components/common/Vacation'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <LangingPage />
      <Vacation />
      <Routes />
    </div>
  );
}

export default App;
