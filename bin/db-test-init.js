//to run
//1. node db-test-init.js

const mongoose = require('mongoose');

const Affiliation = require('../models/affiliation');
const Event = require('../models/event');
const Organization = require('../models/organization');
const Position = require('../models/position');
const Reward = require('../models/reward');
const Role = require('../models/role');
const Tag = require('../models/tag');
const Title = require('../models/title');
const User = require('../models/user');

//create users
let user1 = new User({
    _id: '000000000000000000000001',
    email: 'John@localhost',
    first_name: 'John',
    last_name: 'Wayne',
    password: '1234',
    username: 'JWayne',
    organization_id: '000000000000000000000001',
    position_id: '000000000000000000000001',
    title_id: '000000000000000000000001',
    role_id: '000000000000000000000001'
});

let user2 = new User({
    _id: '000000000000000000000002',
    email: 'Jane@localhost',
    first_name: 'Jane',
    last_name: 'Doe',
    password: '1234',
    username: 'JDoe',
    organization_id: '000000000000000000000002',
    position_id: '000000000000000000000002',
    title_id: '000000000000000000000002',
    role_id: '000000000000000000000002'
});

//create affiliations
let affiliation1 = new Affiliation({
    _id: '000000000000000000000001',
    affiliation_description: 'affiliation about engineering',
    full_name: 'engineering affiliation number 1',
    affiliation_name: 'engineering affiliation'
});

let affiliation2 = new Affiliation({
    _id: '000000000000000000000002',
    affiliation_description: 'affiliation about dancing',
    full_name: 'dancing affiliation number 2',
    affiliation_name: 'dancing affiliation'
});

//create events
let event1 = new Event({
    _id: '000000000000000000000001',
    event_description: 'First Event in the events table',
    end_time: new Date("2018-11-02"),
    event_location: 'Los Angeles',
    event_name: 'First Event',
    start_time: new Date("2018-11-01"),
    administrator_id: '000000000000000000000001',
    organizer_id: '000000000000000000000001',
    approved: false,
    tags: ['000000000000000000000001'],
    attendance: ['000000000000000000000001','000000000000000000000002' ]
});

let event2 = new Event({
    _id: '000000000000000000000002',
    event_description: 'Second Event in the events table',
    end_time: new Date("2018-11-02"),
    event_location: 'New York',
    event_name: 'Second Event',
    start_time: new Date("2018-11-01"),
    administrator_id: '000000000000000000000002',
    organizer_id: '000000000000000000000002'
});

//create organizations
let organization1 = new Organization({
    _id: '000000000000000000000001',
    name: 'Organization 1'
});

let organization2 = new Organization({
    _id: '000000000000000000000002',
    name: 'Organization 2'
});

//create positions
let position1 = new Position({
    _id: '000000000000000000000001',
    name: 'Student'
});

let position2 = new Position({
    _id: '000000000000000000000002',
    name: 'Faculty'
});

let position3 = new Position({
    _id: '000000000000000000000003',
    name: 'Staff'
});

//create rewards
let reward1 = new Reward({
    _id: '000000000000000000000001',
    end_time: new Date("2018-11-02"),
    reward_organization: 'reward organization 1',
    reward_poster: 'reward poster 1',
    start_time: new Date("2018-11-01"),
    administrator_id: '000000000000000000000001',
    provider_id: '000000000000000000000001'
});

let reward2 = new Reward({
    _id: '000000000000000000000002',
    end_time: new Date("2018-11-02"),
    reward_organization: 'reward organization 2',
    reward_poster: 'reward poster 2',
    start_time: new Date("2018-11-01"),
    administrator_id: '000000000000000000000002',
    provider_id: '000000000000000000000002'
});

//create roles
let role1 = new Role({
    _id: '000000000000000000000001',
    name: 'Administrator'
});

let role2 = new Role({
    _id: '000000000000000000000002',
    name: 'Event Organizer'
});

let role3 = new Role({
    _id: '000000000000000000000003',
    name: 'Reward Provider'
});

//create tags
let tag1 = new Tag({
    _id: '000000000000000000000001',
    name: 'ECST'
});

let tag2 = new Tag({
    _id: '000000000000000000000002',
    name: 'ACM'
});

//create titles
let title1 = new Title({
    _id: '000000000000000000000001',
    name: 'Director'
});

let title2 = new Title({
    _id: '000000000000000000000002',
    name: 'President'
});

// Attach connection event handlers
mongoose.connection.on('connected', () => console.log('Mongoose connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));

// Using Promise
async function run() {
    //connect to correct database
    await mongoose.connect('mongodb://localhost/test10');

    //delete any previous data
    await User.remove();
    console.log('All users removed.');

    await Affiliation.remove();
    console.log('All affiliations removed.');

    await Event.remove();
    console.log('All events removed.');

    await Organization.remove();
    console.log('All organizations removed.');

    await Position.remove();
    console.log('All positions removed.');

    await Reward.remove();
    console.log('All rewards removed.');

    await Role.remove();
    console.log('All roles removed.');

    await Tag.remove();
    console.log('All tags removed.');

    await Title.remove();
    console.log('All titles removed.');

    //add data into an empty database
    let savedUser = await user1.save();
    console.log(`New user saved: ${savedUser._id}.`);

    let savedUser2 = await user2.save();
    console.log(`New user saved: ${savedUser2._id}.`);

    let savedAffiliation = await affiliation1.save();
    console.log(`New affiliation saved: ${savedAffiliation._id}.`);

    let savedAffiliation2 = await affiliation2.save();
    console.log(`New affiliation saved: ${savedAffiliation2._id}.`);

    let savedEvent = await event1.save();
    console.log(`New event saved: ${savedEvent._id}.`);

    let savedEvent2 = await event2.save();
    console.log(`New event saved: ${savedEvent2._id}.`);

    let savedOrganization = await organization1.save();
    console.log(`New organization saved: ${savedOrganization._id}.`);

    let savedOrganization2 = await organization2.save();
    console.log(`New organization saved: ${savedOrganization2._id}.`);

    let savedPosition = await position1.save();
    console.log(`New user saved: ${savedPosition._id}.`);

    let savedPosition2 = await position2.save();
    console.log(`New user saved: ${savedPosition2._id}.`);

    let savedPosition3 = await position3.save();
    console.log(`New user saved: ${savedPosition3._id}.`);

    let savedReward = await reward1.save();
    console.log(`New user saved: ${savedReward._id}.`);

    let savedReward2 = await reward2.save();
    console.log(`New user saved: ${savedReward2._id}.`);

    let savedRole = await role1.save();
    console.log(`New user saved: ${savedRole._id}.`);

    let savedRole2 = await role2.save();
    console.log(`New user saved: ${savedRole2._id}.`);

    let savedRole3 = await role3.save();
    console.log(`New user saved: ${savedRole3._id}.`);

    let savedTag = await tag1.save();
    console.log(`New user saved: ${savedTag._id}.`);

    let savedTag2 = await tag2.save();
    console.log(`New user saved: ${savedTag2._id}.`);

    let savedTitle = await title1.save();
    console.log(`New user saved: ${savedTitle._id}.`);

    let savedTitle2 = await title2.save();
    console.log(`New user saved: ${savedTitle2._id}.`);

    mongoose.disconnect();
}

run();