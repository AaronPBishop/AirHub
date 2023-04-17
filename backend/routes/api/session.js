const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Sequelize, Op } = require('sequelize');

const { User, Recipe, Favorite, Comment } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();

const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid email.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

router.get('/', restoreUser, async (req, res) => {
    const { user } = req;

    if (user) {
      const userRecipes = await Recipe.findAll({ 
        where: { ownerId: req.user.id },
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

      const favorites = await Favorite.findAll({ where: { userId: user.id } });

      const favRecipes = [];
      for (let key in favorites) {
        const favId = favorites[key].dataValues.id;
        const recipeId = favorites[key].dataValues.recipeId;

        const favRecipe = await Recipe.findOne({ 
          where: { id: recipeId },
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

        if (favRecipe) favRecipes.push({favRecipe, favId});
      };

      const userData = { ...user.toSafeObject(), userRecipes, favorites: favRecipes };

      return res.json({ user: userData });
    } else return res.json({});
});

router.post('/', validateLogin, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    };

    if (!email.length) {
      const err = new Error('Validation error');
      err.status = 400;
      err.title = 'Login failed';
      err.errors = ['Email or username is required'];
      return next(err);
    };

    if (!password.length) {
      const err = new Error('Validation error');
      err.status = 400;
      err.title = 'Login failed';
      err.errors = ['Password is required'];
      return next(err);
    };

    await setTokenCookie(res, user);

    const userRecipes = await Recipe.findAll({ 
      where: { ownerId: req.user.id },
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

    const favorites = await Favorite.findAll({ where: { userId: user.id } });

    const favRecipes = [];
    for (let key in favorites) {
      const favId = favorites[key].dataValues.id;
      const recipeId = favorites[key].dataValues.recipeId;

      const favRecipe = await Recipe.findOne({ 
        where: { id: recipeId },
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

      if (favRecipe) favRecipes.push({favRecipe, favId});
    };

    const userData = { ...user.toSafeObject(), userRecipes, favorites: favRecipes };
    
    return res.json({ user: userData });
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    
    return res.json({ message: 'success' });
});

module.exports = router;