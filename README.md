# Movie Library

## Installation

To run the Web Application on your local system, download Node.js from [here](https://nodejs.org/en/download/). This will give you access to the Node Package Manager (npm), which is essential to run the project.

## Getting Started

1. Open the terminal and type `npm install` to install all the dependencies.
2. Run: `npm start`.
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Prerequisites

### 1. System Requirements

1. Any system with a basic configuration.
2. Operating System: Windows / Linux / Mac.

### 2. Software Requirements

1. Updated browser.
2. Node.js installed (If not, download it [here](https://nodejs.org/en/download/)).
3. Any text editor of your choice.

## Technologies Used

1. JavaScript
2. Node.js
3. ExpressJS
4. MongoDB
5. JWT for authentication
6. OMDB API
7. HTML, CSS, Bootstrap


## Dependencies
1. **React**: A JavaScript library for building user interfaces.
2. **Axios**: A promise-based HTTP client for the browser and Node.js.
3. **React Bootstrap**: Bootstrap components built with React.
4. **React Router DOM**: Declarative routing for React applications.
5. **React Icons**: Popular icons as React components.
6. **React Loader Spinner**: A collection of loaders/spinners for React.
7. **bcryptjs**: A library to hash passwords.
8. **cors**: A middleware to enable CORS.
9. **jsonwebtoken**: A library to sign and verify JSON Web Tokens.
10. **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
11. **nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.

## Features

1. **Sign In and Sign Up authentication**: User authentication using JWT.
2. **Built using MVC Architecture**: Follows the Model-View-Controller design pattern.
3. **Movie Search**: Users can search for a movie by name and get details fetched from the OMDB API.
4. **Playlist Management**:
   - Users can add movies to a playlist (Public or Private).
   - Public playlists can be shared with any other user or guest.
   - Private playlists are visible only to the user after login.
5. **Guest Access**: Users can search for movies and view details without signing in but cannot add movies to a playlist.

