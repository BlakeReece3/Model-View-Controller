const router = require('express').Router();
const { Page, User, Comment } = require('../models');
const { post } = require('./api');

router.get('/', async (req, res) => {
    try {
        const pageData = await Page.findAll({
            include: [User, Comment]
        });
        const pages = pageData.map((page) => post.get({
            plain: true
        }));
        res.render('homepage', { pages });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/page/:id', async (req, res) => {
    try {
      const pageData = await Page.findByPk(req.params.id, {
        include: [
            {
                model: Comment,
            },
            {
                model: User,
            },
        ],
     });

     const page = pageData.get({ plain: true });

     res.render('page', {
        ...page,
        logged_in: req.session.logged_in
     });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
        