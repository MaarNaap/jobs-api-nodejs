const { BadRequest, Unauthenticated } = require("../errors");
const User = require("../models/user");
const tryCatch = require('../middleware/tryCatch');
const { StatusCodes } = require("http-status-codes");


const register = tryCatch(async (req, res, next) => {
    const user = await User.create(req.body);
    const token = user.generateToken();
    res.status(StatusCodes.CREATED).json(token);
});


const login = tryCatch(async (req, res, next) => {
    // check whether email and password are privided
    const { password, email } = req.body;
    if (!password || !email) {
        throw new BadRequest('Provide email and password');
    };
    // get user from db
    const user = await User.findOne({ email });
    if (!user) throw new Unauthenticated('This email is not registered. Provide valid one');
    // check password
    const valid = await user.validatePassword(password);
    if (!valid) throw new Unauthenticated('Password is incorrect. Provide valid one');
    // generate token and send it
    const token = user.generateToken();
    res.status(StatusCodes.OK).send({username:user.name, token});
});

module.exports = { login, register };