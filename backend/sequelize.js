const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    define: {
        timestamps: true,
        underscored: true
    },
    logging: false,
    pool: {
        max: 1500,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
sequelize
    .authenticate()
    .then(() => console.log('connected to mysql database...'))
    .catch(err => console.log('failed to connect database', err.message));
/*sequelize
    .sync() (server.js lekha hoise. //Sync all models that are not)
    */
module.exports = sequelize;