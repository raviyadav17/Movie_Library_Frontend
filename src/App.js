import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import PlayListPage from "./pages/PlayListPage/PlayListPage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PublicPlaylistPage from "./pages/PublicPlaylistPage/PublicPlaylistPage";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/playlist" element={<PlayListPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/movie/:title" element={<MovieDetails />} />
        <Route path="/public-playlist/:userId" element={<PublicPlaylistPage />} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
  );
};

export default App;
