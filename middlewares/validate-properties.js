const { validationResult } = require('express-validator')

const validateProperties = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.errors.map(error => error.msg)
        return res.status(400).json({error: errorMessages})
    };

    next();
}

module.exports = {
    validateProperties
}