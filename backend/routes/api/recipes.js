const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Recipe, Comment, User } = require('../../db/models');

const router = express.Router();

// Get All Recipes
router.get('/', async (req, res) => {
    const allRecipes = await Recipe.findAll({ 
        attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'],
        include: [
            {
                model: Comment,
                as: 'Comments',
                attributes: ['id', 'userId', 'comment'],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    }
                ]
            },
        ],
    });

    return res.json({ recipes: allRecipes });
});


// Create New Recipe
router.post('/', async (req, res, next) => {
    const { brand, item, cookTime, cookTemp, notes } = req.body;

    const ownerId = req.user.id;

    try {
        await Recipe.create({
            ownerId,
            brand,
            item,
            cookTime,
            cookTemp,
            notes
        });

        const allRecipes = await Recipe.findAll({ 
            attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'],
            include: [
                {
                    model: Comment,
                    as: 'Comments',
                    attributes: ['id', 'userId', 'comment'],
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName']
                        }
                    ]
                },
            ],
        });
    
        return res.json({ recipes: allRecipes });
    } catch (e) {
        e.status = 400;
        next(e);
    };
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

    const allRecipes = await Recipe.findAll({ 
        attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'],
        include: [
            {
                model: Comment,
                as: 'Comments',
                attributes: ['id', 'userId', 'comment'],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    }
                ]
            },
        ],
    });

    return res.json({ recipes: allRecipes });
});


// Delete Recipe By Id
router.delete('/:recipeId', async (req, res) => {
    const queriedRecipe = await Recipe.findByPk(req.params.recipeId);

    if (queriedRecipe.ownerId !== req.user.id) return res.status(403).json({"message": "You must be the owner to edit this recipe", "statusCode": 403});
    if (!queriedRecipe) return res.status(404).json({"message": "This recipe no longer exists", "statusCode": 404});

    await queriedRecipe.destroy();

    return res.json({ status: 'Successfully Deleted' });
});


// Search for Recipes
router.post('/search', async (req, res, next) => {
    const { brand, item } = req.body;

    if (brand && !item) {
        const queriedRecipes = await Recipe.findAll({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('brand')),
                'LIKE',
                `%${brand.toLowerCase()}%`
            ),
            attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'],
            include: [
                {
                    model: Comment,
                    as: 'Comments',
                    attributes: ['id', 'userId', 'comment'],
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName']
                        }
                    ]
                },
            ],
        });

        return res.json({ recipes: queriedRecipes });
    };

    if (!brand && item) {
        const queriedRecipes = await Recipe.findAll({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('item')),
                'LIKE',
                `%${item.toLowerCase()}%`
            ),
            attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'],
            include: [
                {
                    model: Comment,
                    as: 'Comments',
                    attributes: ['id', 'userId', 'comment'],
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName']
                        }
                    ]
                },
            ],
        });

        return res.json({ recipes: queriedRecipes });
    };

    const queriedRecipes = await Recipe.findAll({
        attributes: ['id', 'ownerId', 'brand', 'item', 'cookTime', 'cookTemp', 'notes', 'avgRating', 'previewImg'],
        where: {
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('brand')),
                    'LIKE',
                    `%${brand.toLowerCase()}%`
                ),
                Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('item')),
                    'LIKE',
                    `%${item.toLowerCase()}%`
                ),
            ],
        },
        include: [
            {
                model: Comment,
                as: 'Comments',
                attributes: ['id', 'userId', 'comment'],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    }
                ]
            },
        ],
    });

    return res.json({ recipes: queriedRecipes });
});


// Rate Recipe By Id
router.put('/:recipeId/rate', async (req, res) => {
    const { rating } = req.body;

    const userId = req.user.id;

    const queriedRecipe = await Recipe.findByPk(req.params.recipeId);

    if (!queriedRecipe) return res.status(404).json({"message": "This recipe no longer exists", "statusCode": 404});

    const userRatings = queriedRecipe.userRatings;

    const ratingsCopy = { ...userRatings };
    ratingsCopy[userId] = rating;

    const avgRating = (Object.values(ratingsCopy).reduce((sum, rating) => sum + rating, 0) / Object.values(ratingsCopy).length);

    await queriedRecipe.update({ avgRating, userRatings: ratingsCopy });

    return res.json({ status: 'Successfully Updated' });
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