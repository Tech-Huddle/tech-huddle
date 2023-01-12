const Sequelize = require('sequelize');
const ENV = process.env


const sequelize = new Sequelize(ENV.DBNAME, ENV.DBUSER, ENV.DBPASSWPRD, {
    host: ENV.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports = sequelize;