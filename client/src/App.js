import React, { useState } from "react";
import './App.css';
import Chat from './pages/Chat.js';
import Join from './pages/Join.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>

    </div>
  );
}



export default App;
