const express = require('express');
const router = express.Router();
const {
    getAllWorkouts,
     getSingleWorkout,
     getWorkoutsById,
     createWorkout,
     deleteWorkout,
     updateWorkout} = require("../controllers/workoutController")

//Get all workouts
router.get("/", getAllWorkouts)
//GET WORKOUTS BY USER
router.get("/", getWorkoutsById)
//GET a single workout
router.get("/:id", getSingleWorkout)
// POST a new workout
router.post("/", createWorkout)
//DELETE a workout
router.delete("/:id", deleteWorkout)
//UPDATE a workout
router.patch("/:id", updateWorkout)
module.exports = router