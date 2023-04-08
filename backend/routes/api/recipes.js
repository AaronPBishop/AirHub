const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Recipe, Comment } = require('../../db/models');

const router = express.Router();

// Get All Recipes
router.get('/', async (req, res) => {
    const allRecipes = await Recipe.findAll({ attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'avgRating', 'previewImg'] });

    return res.json({ recipes: allRecipes });
});


// Create New Recipe
router.post('/', async (req, res, next) => {
    const { brand, item, cookTime, cookTemp, notes, previewImg } = req.body;

    const ownerId = req.user.id;

    try {
        const newRecipe = await Recipe.create({
            ownerId,
            brand,
            item,
            cookTime,
            cookTemp,
            notes,
            previewImg
        });

        return res.status(201).json(newRecipe);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});


// Get Recipe By Id
router.get('/:recipeId', async (req, res) => {
    const queriedRecipe = await Recipe.findOne({
        where: { id: req.params.recipeId },
        include: [
            {
                model: Comment,
                as: 'Comments',
                attributes: ['id', 'userId', 'comment']
            }
        ],
    });

    if (!queriedRecipe) return res.status(404).json({"message": "This recipe no longer exists", "statusCode": 404});

    return res.json({ recipe: queriedRecipe });
});


// Edit Recipe By Id
router.put('/:recipeId', async (req, res) => {
    const { brand, item, cookTime, cookTemp, notes, previewImg } = req.body;

    const queriedRecipe = await Recipe.findByPk(req.params.recipeId);

    if (queriedRecipe.ownerId !== req.user.id) return res.status(403).json({"message": "You must be the owner to edit this recipe", "statusCode": 403});
    if (!queriedRecipe) return res.status(404).json({"message": "This recipe no longer exists", "statusCode": 404});

    await queriedRecipe.update({
        brand,
        item,
        cookTime,
        cookTemp,
        notes,
        previewImg
    });

    return res.json({ recipe: queriedRecipe });
});


// Delete Recipe By Id
router.delete('/:recipeId', async (req, res) => {
    const queriedRecipe = await Recipe.findByPk(req.params.recipeId);

    if (queriedRecipe.ownerId !== req.user.id) return res.status(403).json({"message": "You must be the owner to edit this recipe", "statusCode": 403});
    if (!queriedRecipe) return res.status(404).json({"message": "This recipe no longer exists", "statusCode": 404});

    await queriedRecipe.destroy();

    return res.json({ status: 'Successfully deleted' });
});


// Rate Recipe By Id
router.put('/:recipeId/rate', async (req, res) => {
    const { rating } = req.body;

    const queriedRecipe = await Recipe.findByPk(req.params.recipeId);

    if (!queriedRecipe) return res.status(404).json({"message": "This recipe no longer exists", "statusCode": 404});

    const currentRating = queriedRecipe.avgRating;

    if (currentRating === null) {
        await queriedRecipe.update({ avgRating: Number(rating) });
        return res.json({ queriedRecipe });
    };

    const newRating = (currentRating + Number(rating)) / 2;
    await queriedRecipe.update({ avgRating: Number(newRating.toFixed(2)) });

    return res.json({ queriedRecipe });
});


// Create New Comment
router.post('/:recipeId/new_comment', async (req, res, next) => {
    const { comment } = req.body;

    try {
        const newComment = await Comment.create({
            userId: req.user.id,
            recipeId: req.params.recipeId,
            comment
        });

        return res.status(201).json(newComment);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});

module.exports = router;