const { Router } = require('express');
const { check } = require('express-validator');

const { authPost } = require('../controllers/auth-controller');
const { validateProperties } = require('../middlewares/validate-properties');
const { existingUserByEmail } = require('../helpers/db-validators');

const router = Router();

router.post('/login', [
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( existingUserByEmail ),
    validateProperties
], authPost);

module.exports = router;