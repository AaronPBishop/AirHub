'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, email } = this;
      return { id, firstName, lastName, email };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };

    static async login({ email, password }) {
      const { Op } = require('sequelize');

      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            email: email
          }
        }
      });

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    static async signup({ firstName, lastName, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
      });

      return await User.scope('currentUser').findByPk(user.id);
    };

    static associate(models) {
      User.hasMany(models.Recipe, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
      User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.belongsToMany(models.Recipe, { through: models.Favorite });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        min: 10,
        max: 256,
        isEmail: true,
        notEmpty: {
          msg: 'Email is required'
        },
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 60,
        max: 60
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};