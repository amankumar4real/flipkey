import React from 'react';
import './App.css';
import Routes from "./Routes/Route";
import Navbar from "./Components/common/Navbar";
import ResultPage from './Components/Result/ResultPage';
import LangingPage from './Components/landing/landingPage';
import CovidBanner from './Components/common/CovidBanner'
// import PropertyPageDummy from './Components/PropertyPage/PropertyPageDummy.jsx'

function App() {
  return (
    <div className="App">
      <CovidBanner />
      <Navbar/>
      <Routes />
      {/* <PropertyPageDummy /> */}
    </div>
  );
}

export default App;
