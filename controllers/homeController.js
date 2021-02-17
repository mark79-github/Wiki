const {Router} = require('express');
const router = Router();

const articleService = require('../services/articleService');

router.get('/', (req, res, next) => {
    articleService.getLastThree()
        .then((articles) => {
            console.log(articles)
            res.render('home/home', {articles});
        })
        .catch(next);
});

module.exports = router;
