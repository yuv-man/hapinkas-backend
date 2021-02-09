const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: {
        type: String, 
        required: true
    }, 
    description:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    owner:{
        type: String,
        required: false,
    },
    participants:{
        type: Array,
        required: true,
        default: 0
    }
    
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event