import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const MovieList = ({ movieList }) => {
  return (
    <Card>
      <Card.Header>{movieList.title}</Card.Header>
      <ListGroup variant="flush">
        {movieList.movies.map((movie) => (
          <ListGroup.Item key={movie.imdbID}>
            {movie.title} ({movie.year})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default MovieList;
