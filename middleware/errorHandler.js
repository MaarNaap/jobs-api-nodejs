const { CustomError } = require("../errors");

function errorHandler(err, req, res, next) {
    console.log('inside errorHandler..');
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    };
    res.status(500).send(err);
};

module.exports = errorHandler;