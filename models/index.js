const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
  	dialect: dbConfig.dialect,
  	operatorsAliases: 0,
  
  	pool: {
    	max: dbConfig.pool.max,	
   		min: dbConfig.pool.min,
      	acquire: dbConfig.pool.acquire,
      	idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorialmodel.js")(sequelize, Sequelize);
db.member = require("./member.js")(sequelize, Sequelize); //MEMBER, ORDER, userInfo
db.order = require("./order.js")(sequelize, Sequelize); //MEMBER, ORDER, userInfo
db.userInfo = require("./userInfo.js")(sequelize, Sequelize); //MEMBER, ORDER, userInfo

module.exports = db;