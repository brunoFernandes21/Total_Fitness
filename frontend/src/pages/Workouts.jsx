import React, { useEffect, useState, useContext } from "react";
import { fetchWorkoutsById, deleteWorkout } from "../api";
import { UserContext } from "../contexts/UserContext";
import WorkoutDetails from "../components/WorkoutDetails";
import Modal from "../components/Modal";
import LoadingPage from "../components/Loading";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedWorkout, setDeletedWorkout] = useState({});
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getAllWorkouts = async () => {
      const id = currentUser.uid;
      try {
        setLoading(true);
        const workouts = await fetchWorkoutsById(id);
        setWorkouts(workouts);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    getAllWorkouts();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await deleteWorkout(id);
      if (response) {
        const filteredWorkouts = workouts.filter((workout) => {
          return workout._id !== id;
        });
        setWorkouts(filteredWorkouts);
        setDeletedWorkout(response);
        setShowModal(true);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div className="md:w-[70%] mx-auto">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        deletedWorkout={deletedWorkout}
      />
      <div className="workouts">
      
        {workouts.length === 0 && <h1 className="font-black text-xl text-slate-500">No workouts yet. Your workouts will appear here</h1>}
        {workouts.length > 0 && <h1 className="font-black text-xl text-slate-500">My workouts</h1>}
      
        {!loading &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              onDelete={onDelete}
            />
          ))}
        {loading && <LoadingPage/>}
      </div>
    </div>
  );
};

export default Workouts;
