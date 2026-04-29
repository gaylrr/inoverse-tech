const express = require('express');
const router  = express.Router();
const { authenticate } = require('../middleware/auth');
const ctrl    = require('../controllers/servicesController');

router.get('/archived',      authenticate, ctrl.getArchived);   
router.get('/admin',         authenticate, ctrl.getAllAdmin);    
router.get('/',              ctrl.getAll);
router.post('/',             authenticate, ctrl.create);
router.put('/:id',           authenticate, ctrl.update);
router.delete('/:id',        authenticate, ctrl.remove);
router.patch('/:id/restore', authenticate, ctrl.restore);

module.exports = router;