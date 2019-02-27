'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    id: Schema.Types.ObjectId,
    event_description: {
        type: String, 
        required: true
    },
    end_time: {
        type: Date,
        default: new Date()
    },
    event_location: {
        type: String,
        required: true
    },
    event_name: {
        type: String, 
        required: true, 
        unique: true
    },
    start_time: {
        type: Date, 
        default: new Date()
    },
    administrator_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    organizer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    attendance: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Event', eventSchema);


