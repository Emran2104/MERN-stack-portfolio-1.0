const { model } = require("mongoose")

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 5},
    username: {type: String, required: true, maxLength: 20},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    birthday: {type: String, required: false},
})

module.exports = User = mongoose.model("user", userSchema)