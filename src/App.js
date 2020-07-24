import React from 'react';
import './App.css';
import Routes from "./Routes/Route";
import Navbar from "./Components/common/Navbar";
import ResultPage from './Components/Result/ResultPage';
import LangingPage from './Components/landing/landingPage';
import CovidBanner from './Components/common/CovidBanner'

function App() {
  return (
    <div className="App">
      <CovidBanner />
      <Navbar/>
      <LangingPage />
      <Routes />
      <ResultPage />
    </div>
  );
}

export default App;
