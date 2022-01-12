const sequelize = require('../sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const UserLog = sequelize.define('UserLog', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'users_log',
    timestamps: false
});

module.exports = UserLog;