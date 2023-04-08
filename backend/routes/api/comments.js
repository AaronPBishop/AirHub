const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Comment } = require('../../db/models');

const router = express.Router();

// Get All of a User's Comments
router.get('/', async (req, res) => {
    const userComments = await Comment.findAll({ where: { userId: req.user.id }});

    return res.json({ comments: userComments });
});


// Edit Comment By Id
router.put('/:commentId', async (req, res) => {
    const { comment } = req.body;

    const queriedComment = await Comment.findByPk(req.params.commentId);

    if (queriedComment.userId !== req.user.id) return res.status(403).json({"message": "You must be the owner to edit this comment", "statusCode": 403});
    if (!queriedComment) return res.status(404).json({"message": "This comment no longer exists", "statusCode": 404});

    await queriedComment.update({ comment });

    return res.json({ queriedComment });
});


// Delete Comment By Id
router.delete('/:commentId', async (req, res) => {
    const queriedComment = await Comment.findByPk(req.params.commentId);

    if (queriedComment.userId !== req.user.id) return res.status(403).json({"message": "You must be the owner to edit this comment", "statusCode": 403});
    if (!queriedComment) return res.status(404).json({"message": "This comment no longer exists", "statusCode": 404});

    await queriedComment.destroy();

    return res.json({ status: 'Successfully deleted' });
});

module.exports = router;