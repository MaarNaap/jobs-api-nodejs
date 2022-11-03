const { NotFound } = require("../errors");

function notFound(req, res, next) {
    throw new NotFound('404:: Route Does Not Exist.')
}

module.exports = notFound;