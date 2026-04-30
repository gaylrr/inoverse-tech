const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:          { type: DataTypes.STRING(100), allowNull: false },
  email:         { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  role:          { type: DataTypes.ENUM('admin'), defaultValue: 'admin' },
  created_at:    { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'users', timestamps: false });

const Message = sequelize.define('Message', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:       { type: DataTypes.STRING(255), allowNull: false },
  email:      { type: DataTypes.STRING(100), allowNull: false },
  message:    { type: DataTypes.TEXT, allowNull: false },
  is_read:    { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'messages', timestamps: false });

const Service = sequelize.define('Service', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:       { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  use_cases:   { type: DataTypes.TEXT, allowNull: true },
  icon:        { type: DataTypes.STRING, allowNull: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:   { type: DataTypes.BOOLEAN, defaultValue: true },
  created_at:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  deleted_at:   { type: DataTypes.DATE,    allowNull: true },
}, { tableName: 'services', timestamps: false });

const Project = sequelize.define('Project', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:        { type: DataTypes.STRING, allowNull: false },
  description:  { type: DataTypes.TEXT, allowNull: false },
  technologies: { type: DataTypes.STRING, allowNull: true },
  outcome:      { type: DataTypes.TEXT, allowNull: true },
  image_url:    { type: DataTypes.STRING, allowNull: true },
  project_url:  { type: DataTypes.STRING, allowNull: true },
  order_index:  { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:    { type: DataTypes.BOOLEAN, defaultValue: true },
  created_at:   { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at:   { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  deleted_at:   { type: DataTypes.DATE,    allowNull: true },
}, { tableName: 'projects', timestamps: false });

const Content = sequelize.define('Content', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  page:       { type: DataTypes.STRING, allowNull: false },
  section:    { type: DataTypes.STRING, allowNull: false },
  value:      { type: DataTypes.TEXT, allowNull: false },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'content', timestamps: false });

const Technology = sequelize.define('Technology', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING(100), allowNull: false },
  category:    { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  image_url:   { type: DataTypes.STRING(255), allowNull: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:   { type: DataTypes.BOOLEAN, defaultValue: true },
  created_at:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'technologies', timestamps: false });

module.exports = { sequelize, User, Message, Service, Project, Content, Technology };
