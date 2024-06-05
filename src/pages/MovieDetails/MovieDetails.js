import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { decodeJWT } from "../../services/utils";
import { addMovieToList, fetchMovie } from "../../services/api";
import noPoster from "../../assets/images/no_poster.jpg";
import "./MovieDetails.css";
import Loading from "../../components/Loading/Loading";

const MovieDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetchMovie(title);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [title]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = decodeJWT(token);
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleImageClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handlePlaylist = async () => {
    const isPublic = window.confirm("Do you want to make this movie public?");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in");
      return;
    }

    const user = decodeJWT(token);

    const movieData = {
      imdbID: movieDetails.imdbID,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      type: movieDetails.Type,
      title: movieDetails.Title,
      isPublic: isPublic,
    };

    try {
      const response = await addMovieToList(user, movieData, token);

      // console.log(response);

      if (response) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding movie to playlist:", error);
      alert("An error occurred while adding the movie to the playlist");
    }

    navigate("/playlist");
  };

  if (!movieDetails) {
    return <div className="loading"><Loading/></div>;
  }

  return (
    <div className="movie-detail-wrapper">
      <div className="selected-movie-info">
        <img
          className={`imag ${isFullScreen ? "fullscreen" : ""}`}
          src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : noPoster}
          alt={`${movieDetails.Title} Poster`}
          onClick={handleImageClick}
        />
        <div className="textinfo">
          <div className="heading">
            <h1>{movieDetails.Title}</h1>
            <h1>{movieDetails.imdbRating}⭐</h1>
          </div>
          <div className="subheading">
            <p>{movieDetails.Year}</p>
            <p>{movieDetails.Rated}</p>
            <p>{movieDetails.Runtime}</p>
            <p>{movieDetails.Released}</p>
          </div>
          <p>Plot: &nbsp;{movieDetails.Plot}</p>
          <p>Genre: &nbsp;{movieDetails.Genre}</p>
          <p>Director: &nbsp;{movieDetails.Director}</p>
          <p>Actors: &nbsp;{movieDetails.Actors}</p>
          <p>Language: &nbsp;{movieDetails.Language}</p>
          <p>Country: &nbsp;{movieDetails.Country}</p>
          <p>Awards: &nbsp;{movieDetails.Awards}</p>
        </div>
      </div>
      {isLoggedIn && (
        <button className="add-to-playlist" onClick={handlePlaylist}>
          Add to Playlist
        </button>
      )}
    </div>
  );
};

export default MovieDetails;
