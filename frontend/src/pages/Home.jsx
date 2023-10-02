import { useEffect, useState, useContext } from "react";
import { fetchAllWorkouts, deleteWorkout } from "../api";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../contexts/WorkoutContext";
import Modal from "../components/Modal";
import LoadingPage from "../components/Loading";
import EditWorkoutModal from "../components/EditWorkoutModal";


const Home = () => {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletedWorkout, setDeletedWorkout] = useState({});
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loadInitialWorkouts, setLoadInitialWorkouts] = useState(false)
  const [formInfo, setFormInfo] = useState({})

  useEffect(() => {
    const getAllWorkouts = async () => {
      setPage(1)
      setLoadMore(false)
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
    setLoadMore(false)
    setLoadInitialWorkouts(false)
    try {
      setLoading(true);
      const workouts = await fetchAllWorkouts(page);
      if (workouts.length < 3) {
        setLoadMore(true)
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

  const onEdit = async (id, title, load, reps) => {
    setShowEditModal(true);
    setFormInfo({id, title, load, reps})
  }
  const onDelete = async (id) => {
    let text = "Are you sure you want to delete workout?"
    if(confirm(text) === true){
      try {
        setLoading(true)
        setError(null)
        const response = await deleteWorkout(id);
        if (response) {
          const filteredWorkouts = workouts.filter((workout) => {
            return workout._id !== id;
          });
          setWorkouts(filteredWorkouts);
          setDeletedWorkout(response);
          setLoading(false)
          setShowModal(true);
        }
      } catch (error) {
        setLoading(false)
        setError(error.response.data.error);
      }
    }else {
      return 
    }
    
  };
  console.log(workouts)
  return (
    <div className="home">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        deletedWorkout={deletedWorkout}
      />
      <EditWorkoutModal 
      showEditModal={showEditModal}
      setShowEditModal={setShowEditModal}
      formInfo={formInfo}
      />
      <div className="workouts">
        <h1 className="font-black text-xl text-slate-500">Workouts feed</h1>
        {!loading &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        {loading && <LoadingPage />}
        {workouts.length === 0 && (
          <div className="flex justify-center">
          <p
            className=" font-black text-blue-700 text-xl"
          >
            No workouts to show
          </p>
        </div>
        )}
        {loadMore && (
          <div className="flex justify-center mt-4">
          <button
            onClick={() => setLoadInitialWorkouts(true)}
            className="bg-blue-700 p-3 rounded-full font-black text-white "
          >
            Go back
          </button>
        </div>
        )}
        {workouts.length !== 0 && !loadMore && (
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
