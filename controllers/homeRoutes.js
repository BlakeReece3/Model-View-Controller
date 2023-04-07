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

        