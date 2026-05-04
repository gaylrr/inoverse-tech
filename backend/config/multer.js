const multer = require('multer')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPG, PNG and WEBP images are allowed.'), false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max before resize
})