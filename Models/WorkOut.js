const mongoose = require('mongoose');

// Schema defines the structure of a document inside a database
const Schema = mongoose.Schema;

// create a new schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

        // create a model(collection,schema)
module.exports = mongoose.model('Workout', workoutSchema);
