import React, {useState} from 'react'
import axios from 'axios'


const initialValues = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: "",
  };



export const AddForm = () => {
    const [formValues, setFormValues] = useState(initialValues)


    const handleChange = (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        const newMovie = {
          ...formValues,
          stars: formValues.stars.split(","),
        };
        axios
          .post("http://localhost:5000/api/movies", newMovie)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      };

    

    return (
        <div>
            <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder='title'
          />
          <input
            type="text"
            name="director"
            value={formValues.director}
            onChange={handleChange}
            placeholder='director'
          />
          <input
            type="text"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
            placeholder='metascore'
          />
       
          <button>Submit</button>
        </form>
        </div>
    )
}
