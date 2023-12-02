import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Provider, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";

import * as userClient from "./client/userClient.js";
import { setUser } from "./Account/userReducer";

import './App.css';
import store from "./store";
import Home from './Home';
import Search from './Search';
import Movie from "./Movie";
import Navbar from "./Navbar";
import Signin from "./Account/signin";
import Signout from "./Account/signout.js";
import Profile from "./Profile/index.js";

function App() {

  const dispatch = useDispatch();

  // get logged in user from server. either will be null or user
  const getLoggedInUser = async () => {
    const user = await userClient.getLoggedInUser();
    console.log(`user: ${JSON.stringify(user)}`);
    dispatch(setUser(user));
  };

  // useEffect to set user from user session from server once, either will be null or user
  // if user session ever expires in server, todo: write a way to catch that and sign out here
  useEffect(() => {
    getLoggedInUser();
  }, [])

  return (
    <HashRouter>
      <div className="container">
        <h1>root</h1>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path="/search/:searchParam" element={<Search />} />
            <Route path="/movie/:tmdbMovieId" element={<Movie />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;