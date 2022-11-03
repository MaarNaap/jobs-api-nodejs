const { BadRequest, Unauthenticated } = require("../errors");
const User = require("../models/user");
const tryCatch = require('../middleware/tryCatch');
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcryptjs');

const register = tryCatch(async (req, res, next) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempUser = { name, email, password: hashedPassword };

    const user = await User.create(tempUser);
    res.status(StatusCodes.CREATED).json(user);

});


const login = (req, res, next) => {
    res.send('login');
};

module.exports = { login, register };