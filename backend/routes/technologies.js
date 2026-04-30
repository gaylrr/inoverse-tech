const express = require('express');
const router  = express.Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/technologiesController');

router.get('/',       ctrl.getAll);
router.get('/admin',  authenticate, ctrl.getAllAdmin);
router.post('/',      authenticate, ctrl.create);
router.put('/:id',    authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;