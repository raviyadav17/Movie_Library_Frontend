import axios from "axios";
import { API_BASE_URL, API_KEY, BASE_URL } from "./helper";

// Function for sign in
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function for sign up
export const signUp = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function for fetching user data
export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function for fetching Public Playlist
export const getPublicPlaylist = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/movies/public/${userId}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function for searching movies
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?apikey=${API_KEY}&s=${query}`
    );

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    } else {
      return response.data.Search;
    }
  } catch (error) {
    throw error;
  }
};

// Function for fetching movie details
export const fetchMovie = async (title) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(
        title
      )}&plot=full`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function for adding a movie to the user's movie list
export const addMovieToList = async (user, movieData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/addmovie`,
      { userId: user.id, movie: movieData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get the movie list for the user
export const getMovieList = async (user, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/getmovielist`,
      { userId: user.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to delete a movie

export const deleteMovie = async (user, imdbID, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/deletemovie`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: user.id,
        imdbID: imdbID,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
