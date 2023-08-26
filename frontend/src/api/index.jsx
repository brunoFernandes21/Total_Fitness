import axios from "axios";

const workoutApi = axios.create({
  baseURL: "http://localhost:8000/api/workouts/",
});

export const fetchAllWorkouts = async () => {
  const response = await workoutApi.get();
  const workouts = response.data.workouts;
  return workouts;
};
export const fetchWorkoutsById = async (id) => {
  const response = await workoutApi.get(`${id}`);
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

export const deleteWorkout = async (id) => {
  const response = await workoutApi.delete(`${id}`)
  return response.data.workout
}
