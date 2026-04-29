const { Service } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const services = await Service.findAll({
      where: { is_active: true, deleted_at: null },
      order: [['order_index', 'ASC']]
    });
    res.json({ success: true, data: services });
  } catch (err) { next(err); }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const services = await Service.findAll({
      where: { deleted_at: null },
      order: [['order_index', 'ASC']]
    });
    res.json({ success: true, data: services });
  } catch (err) { next(err); }
};

exports.getArchived = async (req, res, next) => {
  try {
    const services = await Service.findAll({
      where: { deleted_at: { [Op.not]: null } },
      order: [['deleted_at', 'DESC']]
    });
    res.json({ success: true, data: services });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, description, use_cases, icon, order_index } = req.body;
    if (!title || !description)
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    const service = await Service.create({ title, description, use_cases, icon, order_index: order_index || 0 });
    res.status(201).json({ success: true, message: 'Service created.', id: service.id });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { title, description, use_cases, icon, order_index, is_active } = req.body;
    await Service.update(
      { title, description, use_cases, icon, order_index, is_active, updated_at: new Date() },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Service updated.' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Service.update(
      { deleted_at: new Date() },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Service archived.' });
  } catch (err) { next(err); }
};

exports.restore = async (req, res, next) => {
  try {
    await Service.update(
      { deleted_at: null },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Service restored.' });
  } catch (err) { next(err); }
};

exports.permanentDelete = async (req, res, next) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Service permanently deleted.' });
  } catch (err) { next(err); }
};