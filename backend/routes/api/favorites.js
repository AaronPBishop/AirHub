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


// Delete a Favorite
router.delete('/:favoriteId', async (req, res) => {
    const queriedFav = await Favorite.findByPk(req.params.favoriteId);

    await queriedFav.destroy();

    return res.json({ status: 'Successfully Deleted' });
});

module.exports = router;