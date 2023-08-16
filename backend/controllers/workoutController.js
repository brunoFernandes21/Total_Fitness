const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

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
  // If id is not a valid mongoose idObject return an error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).send({ error: "Not Found!" });
  }
  //find workout with the id and store it in the 
  //workout variable
  const workout = await Workout.findById(id);

    //if we could not find the workout with that id, we return an error
  if (!workout) {
    return response.status(404).send({ error: "Not Found!" });
  }
  //if we found it, return it to client
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
const deleteWorkout = async (request, response) => {
  const { id } = request.params;

  // If id is not a valid mongoose idObject return an error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).send({ error: "Not Found!" });
  }
  //find workout with the id and delete it if found and store it in the 
  //workout variable
  const workout = await Workout.findByIdAndDelete({ _id: id });

  //if we could not find the workout with that id, we return an error
  if (!workout) {
    return response.status(404).send({ error: "Not Found!" });
  }
  //if we successfully found and delete the workout, we send a response to 
  //client
  response.status(200).send({ workout });
};

//UPDATE a workout
const updateWorkout = async (request, response) => {
  const { id } = request.params;
  const { title, load, reps} = request.body
  const updatedWorkout = {
    title: title,
    load: load,
    reps: reps
  }
   // If id is not a valid mongoose idObject return an error
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).send({ error: "Not Found!" });
  }

  //find workout with the id, updates it and store the result in workout var
  const workout = await Workout.findOneAndUpdate({_id: id}, updatedWorkout)

   //if we could not find the workout with that id, we return an error
   if (!workout) {
    return response.status(404).send({ error: "Not Found!" });
  }

  response.status(200).send({workout})
}
module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
