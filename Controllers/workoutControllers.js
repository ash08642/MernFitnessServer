const Workout = require('../Models/WorkOut');
const mongoose = require('mongoose');

// get all Workouts
const getWorkouts = async(req,res) => {
    // gives all workout documents as an array
    const workouts = await Workout.find({}).sort({createdAt: -1});
    // sends the array to the browser/client
    res.status(200).json(workouts);
}

// get a single Workout
    const getWorkout = async(req,res) => {
    // get id from route parameter
    const {id} = req.params;
    // check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'});
    }
    // gives a single workout document
    const workout = await Workout.findById(id);
    // if workout not found
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    };
    // sends the array to the browser/client
    res.status(200).json(workout);
}
// create a new Workout
const createWorkout = async(req, res) => {
    const {title, load, reps, description} = req.body;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!description){
        emptyFields.push('description');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in the empty fields', emptyFields})
    }
    // add document to db
    try {
        // create and add document to Collection(Workout)
        const workout = await Workout.create({title, load, reps, description});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete a Workout
const deleteWorkout = async(req, res) => {
    // get id from route parameter
    const {id} = req.params;
    // check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'});
    }
    const workout = await Workout.findOneAndDelete({_id : id});
    // if workout not found
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    };
    res.status(200).json(workout);
}

// update a Workout
const updateWorkout = async(req, res) => {
    // get id from route parameter
    const {id} = req.params;
    // check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'});
    }
    const workout = await Workout.findOneAndUpdate({_id : id},{
        ...req.body
    });
    // if workout not found
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    };
    res.status(200).json(workout);
}
module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
};