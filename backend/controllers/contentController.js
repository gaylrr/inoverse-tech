const { Content } = require('../models');

exports.getByPage = async (req, res, next) => {
  try {
    const rows = await Content.findAll({ where: { page: req.params.page } });
    const content = {};
    rows.forEach(row => { content[row.section] = row.value; });
    res.json({ success: true, data: content });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const rows = await Content.findAll({ order: [['page', 'ASC'], ['section', 'ASC']] });
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { page, section, value } = req.body;
    if (!page || !section || !value)
      return res.status(400).json({ success: false, message: 'page, section and value are required.' });
    await Content.upsert({ page, section, value });
    res.json({ success: true, message: 'Content updated.' });
  } catch (err) { next(err); }
};