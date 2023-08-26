const mongoose = require("mongoose")

const { Schema } = mongoose;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout