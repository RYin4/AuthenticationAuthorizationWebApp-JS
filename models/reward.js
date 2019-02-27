'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rewardSchema = new Schema({
    id: Schema.Types.ObjectId,
    end_time: {
        type: Date,
        default: new Date()
    },
    reward_organization: {
        type: String, 
        required: true
    },
    reward_poster: {
        type: String, 
        required: true
    },
    start_time: {
        type: Date, 
        default: new Date()
    },
    administrator_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    provider_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Reward', rewardSchema);

