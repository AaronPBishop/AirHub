const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Recipe, Favorite } = require('../../db/models');

const router = express.Router();

// Create a Favorite
router.post('/', async (req, res) => {
    const { userId, recipeId } = req.body;

    const newFavorite = await Favorite.create({ userId, recipeId });

    return res.status(201).json(newFavorite);
});


// Get All of a User's Favorites
router.get('/:userId', async (req, res) => {
    const userFavorites = await Favorite.findAll({
        where: { userId: req.params.userId },
        include: { model: Recipe }
    });

    return res.json({ recipes: userFavorites });
});

module.exports = router;