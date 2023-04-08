const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Recipe, Comment } = require('../../db/models');

const router = express.Router();

module.exports = router;