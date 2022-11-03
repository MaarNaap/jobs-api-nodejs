const { BadRequest, Unauthenticated } = require("../errors");
const User = require("../models/user");
const tryCatch = require('../middleware/tryCatch');
const { StatusCodes } = require("http-status-codes");

const login = (req, res, next) => {
    res.send('login');
};

const register = tryCatch(async (req, res, next) => {
    // const { name, email, password } = req.body;
    // if (!name || !email || !password) throw new BadRequest('Provide your name, email and password');
    // const user = new User(req.body);
    // await user.save();
    // res.send(user);

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
});

module.exports = { login, register };