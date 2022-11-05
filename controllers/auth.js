const { BadRequest, Unauthenticated } = require("../errors");
const User = require("../models/user");
const tryCatch = require('../middleware/tryCatch');
const { StatusCodes } = require("http-status-codes");

const register = tryCatch(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
});


const login = (req, res, next) => {
    res.send('login');
};

module.exports = { login, register };