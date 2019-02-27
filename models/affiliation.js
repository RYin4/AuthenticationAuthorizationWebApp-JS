'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let affiliationSchema = new Schema({
    id: Schema.Types.ObjectId,
    affiliation_description: {
        type: String, 
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    affilation_name: {
        type: String, 
        requred: true
    }
});

module.exports = mongoose.model('Affiliation', affiliationSchema);