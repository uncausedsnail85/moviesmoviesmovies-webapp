import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Navbar() {

    const navigate = useNavigate();

    // page state
    const [searchTerm, setSearchTerm] = useState(); // keeps track of search term in search bar

    // TODO: dynamic highlight active page
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="./#/home">logo</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                            <a class="nav-link" href="#">Movies</a>
                            <a class="nav-link" href="#">Profile</a>
                        </div>
                    </div>
                    <form class="d-flex flex-grow-1" role="search">
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
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link"href="./#/signin">Sign in</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar