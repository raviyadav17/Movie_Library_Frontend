import React, { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { searchMovies } from "../../services/api";
import "./SearchMovies.css";

const SearchMovies = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); // State to store error message
  
    const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const searchResults = await searchMovies(query); // Call searchMovies function from auth.js
        setResults(searchResults);
        setSearched(true); // Set searched to true after search
  
        // Wait for the DOM to update before scrolling
        setTimeout(() => {
          const resultsCard = document.getElementById("resultsCard");
          if (resultsCard) {
            resultsCard.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100); // Adjust the delay if needed
      } catch (error) {
        console.error("Error searching movies", error);
        setResults([]);
        setSearched(true);
        setErrorMsg(error.message); // Store the error message
      }
    };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="search-header">
          <h2 className="welcome">Welcome...</h2>
          <h5>You can search your movie here...</h5>
          <form
            className="d-flex justify-content-center w-100"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search your Movies..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn search-button" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {searched && results?.length === 0 ? (
        <div className="empty">
          <h2>{errorMsg}</h2>
        </div>
      ) : (
        <div id="resultsCard" className="Card">
          {results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
