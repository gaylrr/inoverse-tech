const sharp = require('sharp')
const path  = require('path')
const fs    = require('fs')

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' })
  }

  try {
    const filename  = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`
    const outputPath = path.join(__dirname, '../uploads', filename)

    // Resize to 1600x900 — cover fit keeps aspect ratio and crops excess
    await sharp(req.file.buffer)
      .resize(1600, 900, {
        fit: 'cover',        // fills 1600x900, crops excess
        position: 'center',  // crops from center
      })
      .jpeg({ quality: 85 }) // compress to reduce file size
      .toFile(outputPath)

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`

    res.json({
      success: true,
      message: 'Image uploaded and resized to 1600×900.',
      data: {
        filename,
        url: imageUrl,
        width: 1600,
        height: 900,
      },
    })
  } catch (err) {
    console.error('Image processing error:', err)
    res.status(500).json({ success: false, message: 'Image processing failed.' })
  }
}

exports.deleteImage = (req, res) => {
  const filename = req.params.filename
  const filepath = path.join(__dirname, '../uploads', filename)

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ success: false, message: 'File not found.' })
  }

  fs.unlinkSync(filepath)
  res.json({ success: true, message: 'Image deleted.' })
}