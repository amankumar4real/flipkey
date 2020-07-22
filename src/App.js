import React from 'react';
import './App.css';
import Login from './Compoenents/Auth/Login';
import NavBar from './Compoenents/common/NavBar';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Login />
    </div>
  );
}

export default App;
