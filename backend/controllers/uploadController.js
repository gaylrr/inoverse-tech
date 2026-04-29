exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: 'Image uploaded successfully.',
    data: {
      filename: req.file.filename,
      url: imageUrl,
    },
  });
};

exports.deleteImage = (req, res) => {
  const fs   = require('fs');
  const path = require('path');

  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../uploads', filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ success: false, message: 'File not found.' });
  }

  fs.unlinkSync(filepath);
  res.json({ success: true, message: 'Image deleted.' });
};