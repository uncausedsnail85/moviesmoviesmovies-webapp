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
import TvShow from "./TvShow/index.js";
import Company from "./Company/index.js";
import Navbar from "./Navbar";
import Signin from "./Account/signin";
import Signout from "./Account/signout.js";
import Profile from "./Profile/index.js";
import EditProfile from "./Profile/editProfile.js";
import Test from "./test.js";
import Signup from "./Account/signup.js";
import UserTable from "./Profile/UserTable.js";
import EditLikes from "./Movie/EditLikes.js";

function App() {

  const dispatch = useDispatch();

  // get logged in user from server. either will be null or user
  const getLoggedInUser = async () => {
    const user = await userClient.getLoggedInUser();
    // console.log(`user: ${JSON.stringify(user)}`);
    dispatch(setUser(user));
  };

  // useEffect to set user from user session from server once, either will be null or user
  // if user session ever expires in server, todo: write a way to catch that and sign out here
  useEffect(() => {
    getLoggedInUser();
  }, [])

  return (
    <HashRouter>
      <div className="container m3-global">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path='/search/*' element={<Search />} />
            <Route path="/details/:tmdbMovieId" element={<Movie />} />
            <Route path="/details/:tmdbMovieId/editlikes" element={<EditLikes />} />            
            <Route path="/details/show/:tmdbId" element={<TvShow />} />
            <Route path="/details/company/:tmdbId" element={<Company />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/settings" element={<EditProfile />} />
            <Route path="/testresponse" element={<Test />} />
            <Route path="/profile/usertable" element={<UserTable />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;