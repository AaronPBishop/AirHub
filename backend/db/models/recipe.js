'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.hasMany(models.Comment, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
      Recipe.belongsTo(models.User, { foreignKey: 'ownerId', constraints: false });
    }
  }
  Recipe.init({
    ownerId: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    item: DataTypes.STRING,
    cookTime: DataTypes.INTEGER,
    cookTemp: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    avgRating: DataTypes.DECIMAL,
    previewImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};