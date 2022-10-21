import React, { useState, useEffect } from "react";
import './App.css';
import Chat from './pages/Chat.js';
import Join from './pages/Join.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat/:name" element={<Chat />} />
        </Routes>
      </Router>

    </div>
  );
}



export default App;
