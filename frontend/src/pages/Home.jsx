import { useEffect, useState, useContext } from "react";
import { fetchAllWorkouts, deleteWorkout } from "../api";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../contexts/WorkoutContext";
import Modal from "../components/Modal";
import LoadingPage from "../components/Loading";


const Home = () => {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedWorkout, setDeletedWorkout] = useState({});
  const [page, setPage] = useState(1);
  const [lastWorkouts, setLastWorkouts] = useState(false);
  const [loadInitialWorkouts, setLoadInitialWorkouts] = useState(false)


  useEffect(() => {
    const getAllWorkouts = async () => {
      setPage(1)
      setLastWorkouts(false)
      try {
        setLoading(true);
        const workouts = await fetchAllWorkouts();
        setWorkouts(workouts);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    getAllWorkouts();
  }, [loadInitialWorkouts]);

  const handleLoadMore = async (event) => {
    event.preventDefault();
    setLastWorkouts(false)
    setLoadInitialWorkouts(false)
    try {
      setLoading(true);
      const workouts = await fetchAllWorkouts(page);
      if (workouts.length < 5) {
        setLastWorkouts(true)
        setLoading(false);
        setError(false);
      }
      setPage(page + 1);
      setWorkouts(workouts);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

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
    <div className="home">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        deletedWorkout={deletedWorkout}
      />
      <div className="workouts">
        <h1 className="font-black text-xl text-slate-500">Workouts feed</h1>
        {!loading &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              onDelete={onDelete}
            />
          ))}
        {loading && <LoadingPage />}
        {lastWorkouts && (
          <div className="flex justify-center">
          <button
            onClick={() => setLoadInitialWorkouts(true)}
            className="bg-blue-700 p-3 rounded-full font-black text-white "
          >
            Go back
          </button>
        </div>
        )}
        {!lastWorkouts && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-blue-700 p-3 rounded-full font-black text-white "
            >
              Load more
            </button>
          </div>
        )}
      </div>
      <div className="workout__form md:mt-12 sticky top-24 self-start">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
