import React from 'react';
import './App.css';
import Routes from "./Routes/Route"
import Navbar from "./Components/common/Navbar"
import ResultPage from './Components/Result/ResultPage'
import { FrontSearch } from './Components/FrontSearch/FrontSearch';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes />
      <FrontSearch />
      <ResultPage />
    </div>
  );
}

export default App;
