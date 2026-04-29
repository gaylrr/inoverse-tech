const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/contactController');

router.post('/',          ctrl.submit);
router.get('/',           authenticate, ctrl.getAll);
router.patch('/:id/read', authenticate, ctrl.markRead);
router.delete('/:id',     authenticate, ctrl.remove);

module.exports = router;