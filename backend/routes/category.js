const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/authController');
const {list, create, remove, categoryById} = require('../controllers/categoryController');

router.get('/categories', list);

router.post('/create/:userId', create);

router.delete('/:categoryId', remove);
//el parametro que vamos a dar en la ruta sera buscado por el metodo categoryById y de esta
//forma funciona el remove
router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;