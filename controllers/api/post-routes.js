const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comment } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ]
    })
})