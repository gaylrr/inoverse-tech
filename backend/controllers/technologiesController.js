const { Technology } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const techs = await Technology.findAll({
      where: { is_active: true },
      order: [['category', 'ASC'], ['order_index', 'ASC']]
    });
    res.json({ success: true, data: techs });
  } catch (err) { next(err); }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const techs = await Technology.findAll({
      order: [['category', 'ASC'], ['order_index', 'ASC']]
    });
    res.json({ success: true, data: techs });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, category, description, image_url, order_index } = req.body;
    if (!name || !category)
      return res.status(400).json({ success: false, message: 'Name and category are required.' });
    const tech = await Technology.create({ name, category, description, image_url, order_index: order_index || 0 });
    res.status(201).json({ success: true, message: 'Technology created.', id: tech.id });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, category, description, image_url, order_index, is_active } = req.body;
    await Technology.update(
      { name, category, description, image_url, order_index, is_active, updated_at: new Date() },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Technology updated.' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Technology.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Technology deleted.' });
  } catch (err) { next(err); }
};