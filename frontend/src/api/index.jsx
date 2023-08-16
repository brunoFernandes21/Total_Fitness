import axios from "axios";

const workoutApi = axios.create({
  baseURL: "http://localhost:8000/api/workouts/",
});

export const fetchAllWorkouts = async () => {
  const response = await workoutApi.get();
  const workouts = response.data.workouts;
  return workouts;
};

export const postWorkout = async (newWorkout) => {
    const response = await axios.post(
      "http://localhost:8000/api/workouts/",
      newWorkout
    );
    return response.data
};
