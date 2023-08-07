const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPost, usersPatch, usersDelete } = require('../controllers/users-controller');
const { isRoleValid, uniqueEmail, existingUserById } = require('../helpers/db-validators');
const { validateProperties, validateJWT, hasRole } = require('../middlewares');

const router = Router();


router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( uniqueEmail ),
    check('role').custom( isRoleValid ),
    validateProperties
],usersPost);


router.get('/', [
    // validateJWT
], usersGet);


router.patch('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existingUserById ),
    check('role').custom( isRoleValid ),
    validateProperties
], usersPatch);


router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existingUserById ),
    validateProperties
], usersDelete);

module.exports = router;