const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth.js');
const { validateQueryParameters } = require('../../utils/validation');

const { Recipe } = require('../../db/models');

const router = express.Router();

// Get All Recipes
router.get('/', validateQueryParameters, async (req, res) => {
    const allRecipes = await Recipe.findAll({ attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImage'] });

    return res.json({ Recipes: allRecipes });
});

module.exports = router;