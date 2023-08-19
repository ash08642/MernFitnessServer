require('dotenv').config();

// create instances of express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import workout.js
const workoutRoutes = require('./Routes/workout');

// express app
const app = express();

app.use(cors({
    origin: '*'
}))

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    // listen for requests
    app.listen(process.env.PORT, () =>{
        console.log('connected to db && listening on port 4000!!')
    }); // node server.js (in terminal to run)
        // nodemon server.js
}).catch((error) => {
    console.log(error);
})

