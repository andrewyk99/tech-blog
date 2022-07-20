const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at'
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    }).catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/newpost', withAuth, (req, res) => {
    res.render('newpost', { loggedIn: true });
});

router.get('/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id , {
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ]
    }).then(dbPostData => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render('singlepost', {
                post,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;