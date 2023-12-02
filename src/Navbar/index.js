import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaRegCircleUser } from "react-icons/fa6";

import { setUserToNull } from "../Account/userReducer";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.userReducer);

    // page state
    const [searchTerm, setSearchTerm] = useState(); // keeps track of search term in search bar

    // TODO: dynamic highlight active page
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
                    </div>

                    {/* Search bar */}
                    <form className="d-flex flex-grow-1" role="search">
                        <input className="form-control me-2 " type="search" placeholder="Search Movie" aria-label="Search"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }} />
                        <button
                            className="btn btn-primary" type="submit"
                            onClick={() => navigate(`/search/${searchTerm}`)}>
                            Search</button>
                    </form>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav ">
                            {user == "" && (<button
                                className="btn btn-info" type="submit"
                                onClick={() => navigate(`/signin`)}>Sign in</button>)}
                            {user != "" && (
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <FaRegCircleUser />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={`#/user/${user.username}`}>My Profile</Dropdown.Item>
                                        <Dropdown.Item href="#/user/settings">Account Settings</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#/signout">Sign out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
