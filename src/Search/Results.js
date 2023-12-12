import MovieResults from "./MovieResults";
import UserResults from "./UserResults";
import { useNavigate} from "react-router-dom";

// Search component
function Results() {
    const navigate = useNavigate();
    return (
        <div>
            <MovieResults maxResults={3} />
            <hr />
            <UserResults maxResults={4} />
        </div>
    )
}
export default Results;