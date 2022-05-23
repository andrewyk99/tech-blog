const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        post_url: 'http://localhost:3001',
        title: 'The Tech Blog',
        created_at: new Date();
        user: {
            username: 'test_user'
        }
    });
});

module.exports = router;