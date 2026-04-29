const express  = require('express');
const router   = express.Router();
const upload   = require('../config/multer');
const { authenticate } = require('../middleware/auth');
const { uploadImage, deleteImage } = require('../controllers/uploadController');

// POST /api/upload — upload one image, admin only
router.post('/', authenticate, upload.single('image'), uploadImage);

// DELETE /api/upload/:filename — delete an image, admin only
router.delete('/:filename', authenticate, deleteImage);

module.exports = router;