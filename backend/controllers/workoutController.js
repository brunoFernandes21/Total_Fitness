const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose")
//GET all workouts
const getAllWorkouts = async (request, response) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    response.status(200).send({ workouts });
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
};
//GET a single workout
const getSingleWorkout = async (request, response) => {
  const { id } = request.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return response.status(404).send({ error: "Not Found!"})
  }
  const workout = await Workout.findById(id);

  if(!workout) {
    return response.status(404).send({ error: "Not Found!" });
  }
  response.status(200).json({ workout });
};
//CREATE a new workout
const createWorkout = async (request, response) => {
  const { title, load, reps } = request.body;
  try {
    const newWorkout = await Workout.create({ title, load, reps });
    response.status(200).send(newWorkout);
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
};
//DELETE a workout

//UPDATE a workout

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
};
