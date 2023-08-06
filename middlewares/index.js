const validateProperties = require('../middlewares/validate-properties');
const validateJWT = require('../middlewares/validate-jwt');
const hasRole = require('../middlewares/validate-role');

module.exports = {
    ...validateProperties,
    ...validateJWT,
    ...hasRole
}