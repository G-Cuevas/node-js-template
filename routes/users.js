
const { Router } = require('express');

const router = Router();

const { usersGet, usersPost, usersPatch, usersDelete } = require('../controllers/users-controller');


router.post('/', usersPost);

router.get('/', usersGet);

router.patch('/', usersPatch);

router.delete('/', usersDelete);

module.exports = router;