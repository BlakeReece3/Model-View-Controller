const router = require('express').Router();
const { builtinModules } = require('module');
const { Users, Page } = require('../../models');


router.post('/', async (req, res) => {
    try {
      const newPage = await Page.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPage);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
        const pageData = await Page.destroy({
            where: {
              id: req.params.id,
              user_id: req.session.user_id,
            },
    });

    if (!pageData) {
        res.status(404).json({ message: 'No page found'});
        return;
    }

    res.status(200).json(pageData);
} catch (err) {
    res.status(500).json(err);
}
  });

  module.exports = router;