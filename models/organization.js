'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let organizationSchema = new Schema({
    id: Schema.Types.ObjectId,
        name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Organization', organizationSchema);