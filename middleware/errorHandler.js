const { CustomError } = require("../errors");

function errorHandler(err, req, res, next) {
    console.log('inside errorHandler..');
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    };
    res.status(500).send({myMsg: 'Vague Server Error::', error: err});
};

module.exports = errorHandler;