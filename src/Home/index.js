import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => navigate("/Search") }
                className="btn btn-primary" >
                Search
            </button>
        </div>
    )
}

export default Home;