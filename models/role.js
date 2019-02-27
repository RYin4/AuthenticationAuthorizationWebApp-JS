'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roleSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String, 
        required: true, 
        unique: true
    }
});

module.exports = mongoose.model('Role', roleSchema);