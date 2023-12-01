import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Home from './Home';
import Search from './Search';
import Movie from "./Movie";
import Navbar from "./Navbar";
import Signin from "./Account/signin";

function App() {

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  return (
    <HashRouter>
      <div className="container">
        <h1>root</h1>
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path="/search/:searchParam" element={<Search />} />
            <Route path="/movie/:tmdbMovieId" element={<Movie />} />
            <Route path="/signin" element={<Signin/>} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
