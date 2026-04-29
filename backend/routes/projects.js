const express = require('express');
const router  = express.Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/projectsController');

router.get('/',                  ctrl.getAll);
router.get('/admin',             authenticate, ctrl.getAllAdmin);
router.post('/',                 authenticate, ctrl.create);
router.put('/:id',               authenticate, ctrl.update);
router.delete('/:id',            authenticate, ctrl.remove);
router.get('/archived',          authenticate, ctrl.getArchived);
router.patch('/:id/restore',     authenticate, ctrl.restore);
router.delete('/:id/permanent',  authenticate, ctrl.permanentDelete);

module.exports = router;