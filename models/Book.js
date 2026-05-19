const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  auteur: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  statutDePublication: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'statut_de_publication',
  },
}, {
  tableName: 'books',
  timestamps: true,
});

module.exports = Book;
