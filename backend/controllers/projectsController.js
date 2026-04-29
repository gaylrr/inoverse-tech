const { Project } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      where: { is_active: true, deleted_at: null },
      order: [['order_index', 'ASC']]
    });
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      where: { deleted_at: null },
      order: [['order_index', 'ASC']]
    });
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};

exports.getArchived = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      where: { deleted_at: { [Op.not]: null } },
      order: [['deleted_at', 'DESC']]
    });
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, description, technologies, outcome, image_url, project_url, order_index } = req.body;
    if (!title || !description)
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    const project = await Project.create({ title, description, technologies, outcome, image_url, project_url, order_index: order_index || 0 });
    res.status(201).json({ success: true, message: 'Project created.', id: project.id });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { title, description, technologies, outcome, image_url, project_url, order_index, is_active } = req.body;
    await Project.update(
      { title, description, technologies, outcome, image_url, project_url, order_index, is_active, updated_at: new Date() },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Project updated.' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Project.update(
      { deleted_at: new Date() },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Project archived.' });
  } catch (err) { next(err); }
};

exports.restore = async (req, res, next) => {
  try {
    await Project.update(
      { deleted_at: null },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Project restored.' });
  } catch (err) { next(err); }
};

exports.permanentDelete = async (req, res, next) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Project permanently deleted.' });
  } catch (err) { next(err); }
};