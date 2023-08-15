//require express
const express = require('express')
const mongoose = require("mongoose")
// require dotenv 
require("dotenv").config()
const workoutRoutes = require("./routes/workoutRoutes")
//express app
const app = express()

//middleware
app.use(express.json()) //allows to make post and patch requests
app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

//route handlers
app.use("/api/workouts", workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    //listen for requests
    const port = process.env.PORT
    app.listen(port, () => {
    console.log(`Connected to db & listening on port ${port}`)
  })
}).catch(error => console.log(error))

