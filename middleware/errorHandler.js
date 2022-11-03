const { CustomError } = require("../errors");

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    };
    res.status(500).send('Vague Internal Server Error');
};

module.exports = errorHandler;