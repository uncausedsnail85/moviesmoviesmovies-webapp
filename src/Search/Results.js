import MovieResults from "./MovieResults";
import TvShowResults from "./TvShowResults";
import UserResults from "./UserResults";
import CompanyResults from "./CompanyResults";
import { useNavigate} from "react-router-dom";

// Search component
function Results() {
    const navigate = useNavigate();
    return (
        <div>
            <MovieResults maxResults={3} />
            <hr />
            <TvShowResults maxResults={3} />
            <hr />
            <CompanyResults maxResults={5} />
            <hr />
            <UserResults maxResults={5} />
        </div>
    )
}
export default Results;