import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

export const UpdateForm = ({ movieList, setMovieList }) => {
  const history = useHistory();
  const { id } = useParams();
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log(res.data);
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        setMovieList([...movieList, res.data]);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!formValues ? (
        "Loading..."
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="director"
            value={formValues.director}
            onChange={handleChange}
          />
          <input
            type="text"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
       
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};