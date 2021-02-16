const {Router} = require('express');
const {articleService} = require('../services');


const router = Router();

router.get('/', (req, res, next) => {
    articleService.getAll()
        .then((articles) => {
            res.render('articles/articles', {articles});
        })
        .catch(next);
});

router.get('/create', (req, res) => {
    res.render('articles/create');
});

router.post('/create', (req, res, next) => {
    articleService.create(req.body, req.user.id)
        .then(() => {
            res.redirect('/articles');
        })
        .catch(next);
});

router.get('/details/:articleId', (req, res, next) => {
    const articleId = req.params.articleId;
    articleService.getById(articleId)
        .then((article) => {
            res.render('articles/details', {...article});
        })
        .catch(next);
});

router.get('/edit/:articleId', (req, res, next) => {
    const articleId = req.params.articleId;
    articleService.getById(articleId)
        .then((article) => {
            res.render('articles/edit', {...article});
        })
        .catch(next);
});

router.get('/edit/:articleId', (req, res, next) => {
    const articleId = req.params.articleId;
    articleService.remove(articleId)
        .then(() => {
            res.redirect('/articles');
        })
        .catch(next);
});

module.exports = router;
