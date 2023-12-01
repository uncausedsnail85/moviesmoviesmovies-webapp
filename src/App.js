import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Home from './Home';
import Search from './Search';

function App() {

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  return (
    <HashRouter>
      <div class="container">
        <h1>root</h1>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path='/Search' element={<Search />} />
            <Route path="/Search/:searchParam" element={<Search />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
