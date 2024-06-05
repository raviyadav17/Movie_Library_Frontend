import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicPlaylist } from "../../services/api"; // Make sure the path is correct
import MovieCard from "../../components/MovieCard/MovieCard";
import "./PublicPlaylistPage.css";
import { capitalizeKeys } from "../../services/utils";
import Loading from "../../components/Loading/Loading";

const PublicPlaylistPage = () => {
  const { userId } = useParams();
  const [publicMovies, setPublicMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublicMovies = async () => {
      try {
        const response = await getPublicPlaylist(userId);
        const movies = response.map(capitalizeKeys)
        setPublicMovies(movies);
      } catch (error) {
        console.error("Error fetching public movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicMovies();
  }, [userId]);

  if (isLoading) {
    return <div className="playlist-page"><Loading/></div>;
  }

  return (
    <div className="playlist-page">
      <h1>Public Playlist</h1>
      <div className="playlist-Card">
        <div className="playlist-section">
          <h2>Public Movies:</h2>
          <div className="movie-list">
            {publicMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} showdelete={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPlaylistPage;
