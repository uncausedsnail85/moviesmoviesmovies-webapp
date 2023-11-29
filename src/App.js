import './App.css';
import Home from './Home';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
