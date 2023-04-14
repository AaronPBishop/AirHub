const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Sequelize, Op } = require('sequelize');

const { User, Recipe, Favorite } = require('../../db/models');
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
      const userRecipes = await Recipe.findAll({ where: { ownerId: req.user.id }});
      const favorites = await Favorite.findAll({ 
        where: { userId: user.id },
        include: [{ model: Recipe }]
      });

      const userData = { ...user.toSafeObject(), userRecipes, favorites };

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

    const userRecipes = await Recipe.findAll({ where: { ownerId: req.user.id }});
    const favorites = await Favorite.findAll({ 
      where: { userId: user.id },
      include: [{ model: Recipe }]
    });

    const userData = { ...user.toSafeObject(), userRecipes, favorites };
    
    return res.json({ user: userData });
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    
    return res.json({ message: 'success' });
});

module.exports = router;