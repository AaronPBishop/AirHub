const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Favorite } = require('../../db/models');

const router = express.Router();

// Create a Favorite
router.post('/', async (req, res) => {
    const { userId, recipeId } = req.body;

    const newFavorite = await Favorite.create({ userId, recipeId });

    return res.status(201).json(newFavorite);
});

module.exports = router;