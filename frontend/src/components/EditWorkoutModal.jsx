import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { WorkoutContext } from "../contexts/WorkoutContext";
import { updateWorkout } from "../api/index";
const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const EditWorkoutModal = ({ showEditModal, setShowEditModal, formInfo }) => {
  const { currentUser } = useContext(UserContext);
  const { workouts, setWorkouts } = useContext(WorkoutContext)
  const [formData, setFormData] = useState({
    title: "",
    load: "",
    reps: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      title: formInfo.title,
      load: formInfo.load,
      reps: formInfo.reps,
    });
  }, [showEditModal]);

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
    setShowEditModal(false);
    setError(null);
    setIsLoading(true);
    try {
     const updatedWorkout = await updateWorkout(formInfo.id, formData);
      setWorkouts((current) => {
        return [
          ...current,
          updatedWorkout,
        ]
      })
    } catch (error) {
      setIsLoading(false);
      setError("Unable to update workout");
    }
  };
  return (
    <AnimatePresence mode="wait">
      {showEditModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mt-2 mb-4">
                <p className="text-xl ">Update Workout</p>
              </div>
              {error && (
                <div className="bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center">
                  <span className="font-bold">{error}</span>
                </div>
              )}
              <label htmlFor="title">Exercise Title </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
              <label htmlFor="load">Load(in kg) </label>
              <input
                type="number"
                name="load"
                id="load"
                value={formData.load}
                onChange={handleChange}
              />
              <label htmlFor="reps">Reps </label>
              <input
                type="number"
                name="reps"
                id="reps"
                value={formData.reps}
                onChange={handleChange}
              />
              {!isLoading && <button>Update Workout</button>}
              {isLoading && <button disabled>Updating...</button>}
            </form>
            <div className="flex justify-center">
            {!isLoading && <button className="bg-red-500" onClick={()=> setShowEditModal(false)}>Cancel</button>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditWorkoutModal;
