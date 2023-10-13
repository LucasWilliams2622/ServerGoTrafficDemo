const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },

    name: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },

    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, defaultValue: '', unique: true },
    password: { type: DataTypes.STRING, allowNull: false },

    gender: { type: DataTypes.BOOLEAN, defaultValue: true },
    dob: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    avatar: { type: DataTypes.STRING, defaultValue: '' },
    point: { type: DataTypes.INTEGER },

    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    
    address: { type: DataTypes.STRING },
    longitude: { type: DataTypes.FLOAT },
    latitude: { type: DataTypes.FLOAT },

    status: { type: DataTypes.STRING },
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
    isLogin: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    verificationCode: { type: DataTypes.STRING },
    isVerifiedPhone: { type: DataTypes.BOOLEAN, defaultValue: false },
    isVerifiedEmail: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {}, }
    }
  };

  return sequelize.define('User', attributes, options);
}
