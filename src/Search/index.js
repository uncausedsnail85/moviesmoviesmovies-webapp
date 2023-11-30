import * as client from "../tmdbClient"

function Search() {
    client.findMovies("transformers");
    return (
        <div>
            <h1>Search</h1>
        </div>
    )
}

export default Search;