<<<<<<< HEAD
const { Sequelize, Model, DataTypes } = require("sequelize");
=======
const { Sequelize, Model, DataTypes } = require('sequelize');
>>>>>>> parent of 267efd9 (a)
module.exports = model;

function model(sequelize) {
  const attributes = {
<<<<<<< HEAD
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
=======
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
>>>>>>> parent of 267efd9 (a)

    name: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },

<<<<<<< HEAD
    phone: { type: DataTypes.STRING, uniqe: true, allowNull: false },
    email: { type: DataTypes.STRING, uniqe: true, allowNull: false },
=======
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, defaultValue: '', unique: true },
>>>>>>> parent of 267efd9 (a)
    password: { type: DataTypes.STRING, allowNull: false },

    gender: { type: DataTypes.BOOLEAN, defaultValue: true },
    dob: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
<<<<<<< HEAD
    avatar: { type: DataTypes.STRING, defaultValue: "" },
    point: { type: DataTypes.INTEGER, defaultValue: 0 },

    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    address: { type: DataTypes.STRING, defaultValue: "" },
    longitude: { type: DataTypes.FLOAT, defaultValue: 106.62776583887255 },
    latitude: { type: DataTypes.FLOAT, defaultValue: 10.853838548226635 },

    surplus: { type: DataTypes.INTEGER, defaultValue: 1000000 },
    status: { type: DataTypes.STRING, defaultValue: 1 },
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
    isLogin: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    verificationCode: { type: DataTypes.DOUBLE, defaultValue: 999999 },
    verificationCodeMail: { type: DataTypes.DOUBLE, defaultValue: 999999 },

    isVerifiedDriverLicense: { type: DataTypes.BOOLEAN, defaultValue: false },
    isVerifiedPhone: { type: DataTypes.BOOLEAN, defaultValue: true },
    isVerifiedEmail: { type: DataTypes.BOOLEAN, defaultValue: true },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    totalRide: { type: DataTypes.INTEGER, defaultValue: 0 },
=======
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
>>>>>>> parent of 267efd9 (a)
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
<<<<<<< HEAD
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
=======
      attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {}, }
    }
  };

  return sequelize.define('User', attributes, options);
>>>>>>> parent of 267efd9 (a)
}
