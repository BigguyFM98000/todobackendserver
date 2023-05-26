var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstname: {
        type: String,
        default: 'Guest'
    },
    lastname: {
        type: String,
        default: 'Employee',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
    }
});

var employee = new mongoose.model("Employee", schema);
module.exports = employee;