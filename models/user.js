const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
        // maxlength: 50 // to be removed after hashing passwords
    }
});

// hash password here instead of in the controllers
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// json web token
userSchema.methods.generateToken = function () {
    const token = jwt.sign({ userId: this._id, username: this.name }, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRY});
    return token;
}

const User = mongoose.model('user', userSchema);
module.exports = User;