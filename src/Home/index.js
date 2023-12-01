import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home() {

    const navigate = useNavigate();

    // page state
    const [searchTerm, setSearchTerm] = useState(); // keeps track of search term in search bar

    return (
        <div>
            <h1>Home</h1>
            <div class="row">
                <div class="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Movie Title"
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                </div>
                <div class="col-auto">
                    <button
                        onClick={() => navigate(`/Search/${searchTerm}`)}
                        className="btn btn-primary float-end"
                    >
                        Search
                    </button>
                </div>
            </div>
             {/* Navigate to Search page
            <button onClick={() => navigate("/Search")}
                className="btn btn-primary" >
                Search
            </button> */}
        </div>
    )
}

export default Home;