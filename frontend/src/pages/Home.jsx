import { useEffect, useState, useContext } from 'react'
import { fetchAllWorkouts, deleteWorkout } from '../api'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {WorkoutContext} from "../contexts/WorkoutContext"
import Modal from '../components/Modal'


const Home = () => {
  const { workouts, setWorkouts} = useContext(WorkoutContext)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deletedWorkout, setDeletedWorkout] = useState({})


  useEffect(() => {
    const getAllWorkouts = async () => {
      try {
        setIsLoading(true)
        const workouts = await fetchAllWorkouts()
          setWorkouts(workouts)
          setIsLoading(false)
          setError(false)
      } catch (error) {
        setIsLoading(false)
        setError(error)
      }
    }
    getAllWorkouts()
  },[])

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
    <div className='home py-5'>
      <Modal showModal={showModal} setShowModal={setShowModal} deletedWorkout={deletedWorkout}/>
        <div className='workouts'>
        {!isLoading && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} onDelete={onDelete}/>
        ))}
        {isLoading && <h1>Loading workouts...</h1>}
        </div>
        <div className="workout__form mt-5 sticky top-24 self-start">
        <WorkoutForm/>
      </div>
    </div>
  )
}

export default Home