import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUserToNull } from "../Account/userReducer";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.userReducer);

    // page state
    const [searchTerm, setSearchTerm] = useState(); // keeps track of search term in search bar

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="./#/home">logo</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a
                                className={`nav-link ${pathname.includes("home") && "active"}`}
                                href="./#/home">
                                Home</a>
                            <a
                                className={`nav-link ${pathname.includes("movies") && "active"}`}
                                href="./#/movies">
                                Movies</a>
                            <a
                                className={`nav-link ${pathname.includes("profile") && "active"}`}
                                href={`./#/user/${user.username}`}>
                                My Profile</a>
                        </div>
                        {/* <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown Link
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div> */}
                    </div>
                    <form className="d-flex flex-grow-1" role="search">
                        <input className="form-control me-2 " type="search" placeholder="Search Movie" aria-label="Search"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}

                        />
                        <button
                            className="btn btn-primary" type="submit"
                            onClick={() => navigate(`/search/${searchTerm}`)}>
                            Search</button>
                    </form>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {true && (<button
                                className="btn btn-info" type="submit"
                                onClick={() => navigate(`/signin`)}>Sign in</button>)}
                            {true && (<button
                                className="btn btn-light" type="submit"
                                onClick={() => navigate(`/signout`)}>Sign Out</button>)}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

// TODO: LOGIC FOR BUTTON SHOWING
// TODO: ICONS
// todo: dropdown profile, and edit profile and signout