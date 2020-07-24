import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Components/common/Navbar"
import ResultPage from './Components/Result/ResultPage'
import { FrontSearch } from './Components/FrontSearch/FrontSearch';
import LangingPage from './Components/landing/landingPage'
import Vacation from './Components/common/Vacation'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <LangingPage />
      <Vacation />
      <Routes />
      <FrontSearch />
      <ResultPage />
    </div>
  );
}

export default App;
