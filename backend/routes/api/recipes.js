const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth.js');

const { Recipe } = require('../../db/models');

const router = express.Router();

// Get All Recipes
router.get('/', async (req, res) => {
    const allRecipes = await Recipe.findAll({ attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'] });

    return res.json({ Recipes: allRecipes });
});

module.exports = router;