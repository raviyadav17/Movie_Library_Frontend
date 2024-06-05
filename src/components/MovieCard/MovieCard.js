import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import noPoster from "../../assets/images/no_poster.jpg";

const MovieCard = ({
  movie: { imdbID, Year, Poster, Title, Type, ...rest },
  handleDelete,
  showdelete
}) => {

  const navigate = useNavigate();
  // console.log(imdbID);

  const navigateToDetails = () => {
    navigate(`/movie/${encodeURIComponent(Title)}`);
  };

  return (
    <div className="movie" key={imdbID} onClick={navigateToDetails}>
      <div>
        <p>{Year}</p>
        {showdelete ? (
          <MdDelete
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(imdbID);
            }}
            className="icon"
          />
        ) : null}
      </div>
      <div>
        <img src={Poster !== "N/A" ? Poster : noPoster} alt={Title} />
      </div>
      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
