const { StatusCodes } = require("http-status-codes");
// const { CustomError } = require("../errors");

function errorHandler(err, req, res, next) {
    console.log('inside errorHandler..');
    // if (err instanceof CustomError) {
    //     return res.status(err.statusCode).send(err.message);
    // };
    if (err.name === 'CastError') {
        err.statusCode = StatusCodes.NOT_FOUND;
        err.message = `This ID is not found: ${err.value}`
    };
    if (err.name === 'ValidationError') {
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.message = Object.keys(err.errors).map(item => err.errors[item]['message']).join(' && ')
    };
    if (err.type === 'entity.parse.failed') {
        err.message = `Invalid json : \r\n ${err.body}`
    };
    // return res.status(err.statusCode || 500).send(err);
    return res.status(err.statusCode || 500).send(err.message || {myMsg: 'Vague Server Error::', error: err});
};

module.exports = errorHandler;