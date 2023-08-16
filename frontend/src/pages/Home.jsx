import { useEffect, useState } from 'react'
import { fetchAllWorkouts } from '../api'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const getAllWorkouts = async () => {
      try {
        const workouts = await fetchAllWorkouts()
        if(workouts) {
          setWorkouts(workouts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllWorkouts()
  },[])
  return (
    <div className='home'>
        <div className='workouts'>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
        </div>
        <div className="workout__form sticky top-28 self-start mt-5 hover:shadow-xl">
        <WorkoutForm/>
      </div>
    </div>
  )
}

export default Home