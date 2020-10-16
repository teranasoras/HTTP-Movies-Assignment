import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  // const params = useParams();
  const { id } = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => history.push('/'))
      .catch((err) => console.log(err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button
        className="button"
        onClick={() => {
          history.push(`/update-movie/${id}`);
        }}
      >
        Update
      </button>

      <button className="button" onClick={deleteMovie}>
        Delete
      </button>

      
    </div>
  );
}

export default Movie;