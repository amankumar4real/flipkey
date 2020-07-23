import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Components/common/Navbar"
import ResultPage from './Components/Result/ResultPage'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes />
      <ResultPage />
    </div>
  );
}

export default App;
