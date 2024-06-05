import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { decodeJWT } from "../../services/utils";
import { getUserData } from "../../services/api";

const NavigationBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const decodedToken = decodeJWT(token);
        // setUser(decodedToken.id);
        try {
          const response = await getUserData(decodedToken.id);
          // console.log(response);
          setUser(response.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setUser("");
    navigate("/"); // Redirect to the home page
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="d-flex justify-content-between align-center px-4 py-1"
    >
      <Navbar.Brand as={Link} to="/">
        Movie Library
      </Navbar.Brand>
      {user ? (
        <>
          <Navbar.Brand as={Link} to="/profile">
            {user}
          </Navbar.Brand>
          <Nav className="mr-auto d-flex justify-content-between">
            <Nav.Link as={Link} to="/playlist">
              PlayList
            </Nav.Link>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
          </Nav>
        </>
      ) : (
        <Nav className="mr-auto d-flex justify-content-between">
          <Nav.Link as={Link} to="/signup">
            Sign Up
          </Nav.Link>
          <Nav.Link as={Link} to="/signin">
            Sign In
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default NavigationBar;
