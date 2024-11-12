const { DataTypes} = require('sequelize');
const sequelize = require('./database');
//const Chamado = require('../database/chamado');

const Usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false,
    }
},
    {
    tableName: 'usuario',
    timestamps: false,
     }
);


//Usuario.hasMany(Chamado, { foreignKey: 'id_usuario' });
module.exports = Usuario;
