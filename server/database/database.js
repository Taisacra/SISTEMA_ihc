const { Sequelize } = require("sequelize");
//import Sequelize from "sequelize";

const connection = new Sequelize("sistema", "root", "",{
    host: "localhost",
    dialect: "mysql",
});

module.exports = connection;