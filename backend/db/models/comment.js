'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', constraints: false });
      Comment.belongsTo(models.Recipe, { foreignKey: 'recipeId', constraints: false });
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};