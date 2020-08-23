const fs = require('fs');

const path = require('path');

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

console.log('------');
console.log('ENV: ', env);
console.log('CONFIG: ', config);
console.log('------');

const basename = path.basename(module.filename);
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
  console.log('------');
  console.log('CONFIG.USE_ENV_VARIABLE: ', config.use_env_variable);
  console.log('JAWSDB_URL: ', process.env.JAWSDB_URL);
  console.log('------');
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
