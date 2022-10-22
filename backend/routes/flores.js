const express = require('express');
const router = express.Router();

const {list, create, remove, floresById, foto, read} = require('../controllers/floresController');

router.get('/flores', list);
router.post('/create', create);
router.get('/foto/:floresId', foto)
router.delete('/:floresId', remove);
router.get('/:floresId', read)
router.param('floresId', floresById);

module.exports = router;