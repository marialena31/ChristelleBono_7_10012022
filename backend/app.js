const sequelize = require('./sequelize')
const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//authorization from all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//authorization of all listed headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//authorization of all listed methods
    next();
});

sequelize.sync()
app.get("/", (req, res) => {
    res.json({ message: "model syncro!" });
});

app.use(express.json());

module.exports = app;