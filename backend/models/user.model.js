// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     fname: {
//         type: String,
//         required: true
//     },
//     lname: {
//         type: String,
//         required: false
//     },
//     age: {
//         type: Number,
//         required: false
//     },
//     maritalstatus: {
//         type: String, // This should be a string
//         enum: ['Single', 'Married', 'Divorced', 'Widowed'], // Allowed values
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['normal', 'admin'],
//         default: 'normal'
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);







const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    fname: {
        type: String,
        required: [true, "first name is required"]
    },
    lname: {
        type: String,
    },
    age: {
        type: Number
    },
    maritalstatus: {
        type: String, // This should be a string
        enum: ['Single', 'Married', 'Divorced', 'Widowed'], // Allowed values
        required: true
    },
    usercategories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
        }],
        default: []
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'normal'],
        default: 'normal'
    },
    refreshTokens: [String]
},
    {
        timestamps: true,
        index: { role: 1 }
    })

module.exports = mongoose.model("User", userSchema)