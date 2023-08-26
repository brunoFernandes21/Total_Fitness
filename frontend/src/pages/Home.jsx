import { useEffect, useState, useContext } from 'react'
import { fetchAllWorkouts, deleteWorkout } from '../api'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {WorkoutContext} from "../contexts/WorkoutContext"
import Modal from '../components/Modal'

const Home = () => {
  const { workouts, setWorkouts} = useContext(WorkoutContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deletedWorkout, setDeletedWorkout] = useState({})


  useEffect(() => {
    const getAllWorkouts = async () => {
      try {
        setLoading(true)
        const workouts = await fetchAllWorkouts()
          setWorkouts(workouts)
          setLoading(false)
          setError(false)
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }
    getAllWorkouts()
  },[])
  console.log(workouts)
  const onDelete = async (id) => {
    try {
      const response = await deleteWorkout(id)
      if(response) {
        const filteredWorkouts = workouts.filter((workout) => {
          return workout._id !== id
        })
        setWorkouts(filteredWorkouts)
        setDeletedWorkout(response)
        setShowModal(true)
      }
    } catch (error) {
      setError(error.response.data.error)
    }
    
  }
  return (
    <div className='home'>
      <Modal showModal={showModal} setShowModal={setShowModal} deletedWorkout={deletedWorkout}/>
        <div className='workouts'>
        {!loading && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} onDelete={onDelete}/>
        ))}
        {loading && <h1>Loading workouts...</h1>}
        </div>
        <div className="workout__form md:mt-5 sticky top-24 self-start">
        <WorkoutForm/>
      </div>
    </div>
  )
}

export default Home