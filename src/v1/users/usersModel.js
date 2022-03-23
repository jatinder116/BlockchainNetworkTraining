const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Name is required']
    },
    contact : {
        type : Number,
        required : [true, 'Contact is required'],
    },
    email : {
        type : String,
        required : [true, 'Email is required']
    },
    password : {
        type : String,
        required : [true, 'Password is required']
    },
    is_verified : {
        type : Boolean,
        default : 0
    },
    dob : {
        type : Date,
        required : [true, 'DOB is required']
    },
    address : {
        line1 : {
            type : String,
            required : [true, 'Address line 1 is required']
        },
        line2 : {
            type : String
        },
        city : {
            type : String,
            required : [true, 'City is required']
        },
        state : {
            type : String,
            required : [true, 'State is required']
        },
        zip : {
            type : Number,
            required : [true, 'ZIP is required']
        }
    },
    status : {
        type : Boolean,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 