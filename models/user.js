'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//format of the following is = scicafe-test-insert.sql
let userSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    position_id: {
        type: Schema.Types.ObjectId,
        ref: 'Position'
    },
    title_id: {
        type: Schema.Types.ObjectId,
        ref: 'Title'
    }, 
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
});

module.exports = mongoose.model('User', userSchema);