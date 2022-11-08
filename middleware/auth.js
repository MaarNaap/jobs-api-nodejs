const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");
const User = require("../models/user");
const tryCatch = require("./tryCatch");

const authorizeUser = tryCatch(async function (req, res, next) {
    // check for authorization header that must start with [Bearer ]
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthenticated('Unauthorized. Provide valid credentials');
    };
    // get the token alone
    const token = authHeader.split(' ')[1];
    // decode the token by jwt and find user from db by id and pass it to the next middleware as [req.user]. pass only selected properties of the user.
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) throw new Unauthenticated('Unauthorized. User not found. Provide valid credentials');
        req.user = { userId: user._id, username: user.name };
        next();
    } catch (error) {
        throw new Unauthenticated('Unauthorized. Provide valid token:: ' + error);
    }
});

module.exports = authorizeUser;