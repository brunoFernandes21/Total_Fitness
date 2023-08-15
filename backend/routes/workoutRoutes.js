const express = require('express');
const router = express.Router();
const {getAllWorkouts, getSingleWorkout, createWorkout} = require("../controllers/workoutController")

//Get all workouts
router.get("/", getAllWorkouts)
//GET a single workout
router.get("/:id", getSingleWorkout)
// POST a new workout
router.post("/", createWorkout)
//DELETE a workout
router.delete("/:id", (request, response) => {
    response.status(200).json({msg: "GOT a delete request"})
})
//UPDATE a workout
router.patch("/:id", (request, response) => {
    response.status(200).json({msg: "GOT an update request"})
})
module.exports = router