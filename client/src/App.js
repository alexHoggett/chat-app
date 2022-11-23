import React from "react";
import './App.css';
import Chat from './views/Chat.js';
import Join from './views/Join.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat/:room/:name" element={<Chat />} />
          <Route 
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Router>

    </div>
  );
}



export default App;
