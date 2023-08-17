import { useState, useContext } from "react";
//context api
import { WorkoutContext } from '../contexts/WorkoutContext'
import FormHeader from "./FormHeader";
import { postWorkout } from "../api";

const WorkoutForm = () => {
  const [ formData, setFormData] = useState({ title: "", load: "", reps: "" });
  const [ isLoading, setIsLoading] = useState(false);
  const [ error, setError] = useState(null);
  const { workouts, setWorkouts } = useContext(WorkoutContext)
  const [ showForm, setShowForm ] = useState(false)
  const [ emptyFields, setEmptyFields ] = useState([])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null)
    try {
        const workout = await postWorkout(formData)
        setShowForm(false)
        setWorkouts((currentWorkouts) => {
          return [
            workout,
            ...currentWorkouts
          ]
        })
        setFormData({ title: "", load: "", reps: "" });
        setIsLoading(false)
        setError(null)
        setEmptyFields([])
    } catch (error) {
        setIsLoading(false)
        setError(error.response.data.error)
        setEmptyFields(error.response.data.emptyFields)
    }

  };

  const showAddForm = () => {
    setShowForm(!showForm)
    setError(null)
  }
  //add for adjust size of form mt-5 mb-60
  return (
    <div className="create rounded-lg p-5">
      <FormHeader onAdd={showAddForm} showForm={showForm}/>
      {error && (
        <div className='error bg-red-100 mb-5 text-red-700 px-4 py-3 rounded flex justify-center items-center" role="alert" '>
          <span className="font-bold text-center">{error}</span>
        </div>
      )}
      {showForm && <form onSubmit={handleSubmit}>
        <label htmlFor="title">Exercise Title </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label htmlFor="load">Load(in kg) </label>
        <input
          type="number"
          name="load"
          id="load"
          value={formData.load}
          onChange={handleChange}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
        <label htmlFor="reps">Reps </label>
        <input
          type="number"
          name="reps"
          id="reps"
          value={formData.reps}
          onChange={handleChange}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />
        {!isLoading && <button  className="mt-4 bg-blue-700 text-white text-lg md:text-xl">Create Workout</button>}
        {isLoading && <button disabled className="mt-4 ">Creating...</button>}
      </form>}
    </div>
    
  );
};

export default WorkoutForm;