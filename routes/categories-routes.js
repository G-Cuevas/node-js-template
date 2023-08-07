const { Router } = require('express');
const { check } = require('express-validator');

const { validateProperties, validateJWT } = require('../middlewares');
const { categoriesGetAll, categoriesGet, categoriesPost, categoriesPatch, categoriesDelete } = require('../controllers/categories-controller');

const router = Router();

router.get('/', [
    validateJWT,
    validateProperties
], categoriesGetAll);

router.get('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    validateProperties
],  categoriesGet);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateProperties
], categoriesPost);

router.patch('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    validateProperties
], categoriesPatch);

router.delete('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    validateProperties
], categoriesDelete);


module.exports = router;
