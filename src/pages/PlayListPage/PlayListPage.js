import React, { useEffect, useState } from "react";
import { decodeJWT } from "../../services/utils";
import { capitalizeKeys } from "../../services/utils";
import { deleteMovie, getMovieList } from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MdContentCopy } from "react-icons/md"; // Import an icon for copying
import "./PlayListPage.css";

const PlayListPage = () => {
  const [publicMovies, setPublicMovies] = useState([]);
  const [privateMovies, setPrivateMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMovieList = async () => {
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      const user = decodeJWT(token);
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);

      try {
        const response = await getMovieList(user, token);

        const movies = response.data.map(capitalizeKeys);

        const publicMovies = movies.filter((movie) => movie.IsPublic);
        const privateMovies = movies.filter((movie) => !movie.IsPublic);

        setPublicMovies(publicMovies);
        setPrivateMovies(privateMovies);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovieList();
  }, [token]);

  const handleDelete = async (imdbID) => {
    try {
      const user = decodeJWT(token);
      await deleteMovie(user, imdbID, token);
      setPublicMovies(publicMovies.filter((movie) => movie.imdbID !== imdbID));
      setPrivateMovies(
        privateMovies.filter((movie) => movie.imdbID !== imdbID)
      );
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleCopyLink = () => {
    const user = decodeJWT(token);
    const publicLink = `${window.location.origin}/public-playlist/${user.id}`;
    navigator.clipboard
      .writeText(publicLink)
      .then(() => {
        alert("Public playlist link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (!isLoggedIn) {
    return <div className="playlist-page">User not logged in</div>;
  }

  return (
    <div className="playlist-page">
      <h1>Your Playlist</h1>
      <div className="playlist-Card">
        <div className="playlist-section">
          <div className="playlist-public">
            <h2>Public : </h2>
            <MdContentCopy
              onClick={handleCopyLink}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
          </div>
          <div className="movie-list">
            {publicMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                handleDelete={handleDelete}
                showdelete={true}
              />
            ))}
          </div>
        </div>
        <div className="playlist-section">
          <h2>Private : </h2>
          <div className="movie-list">
            {privateMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                handleDelete={handleDelete}
                showdelete={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayListPage;
