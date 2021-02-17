const {Router} = require('express');
const {articleService} = require('../services');
const {isLogged, isCreator} = require('../middlewares');


const router = Router();

router.get('/', (req, res, next) => {
    articleService.getAll()
        .then((articles) => {
            res.render('articles/articles', {articles});
        })
        .catch(next);
});

router.post('/search', (req, res, next) => {
    const {filter} = req.body;

    articleService.getAll(filter)
        .then((articles) => {
            res.render('articles/search', {articles, filter});
        })
        .catch(next);
});

router.get('/create', isLogged, (req, res) => {
    res.render('articles/create');
});

router.post('/create', isLogged, (req, res, next) => {
    articleService.create(req.body, req.user.id)
        .then(() => {
            res.redirect('/articles');
        })
        .catch(next);
});

router.get('/details/:articleId', isCreator, (req, res, next) => {
    const articleId = req.params.articleId;
    articleService.getById(articleId)
        .then((article) => {
            const paragraphs = article.description.split(/\r?\n/);
            res.render('articles/details', {...article, description: paragraphs});
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

router.post('/edit/:articleId', (req, res, next) => {
    const articleId = req.params.articleId;
    // console.log('articleId', articleId);
    articleService.edit(articleId, req.body)
        .then((response) => {
            // console.log('response', response);
            res.redirect(`/articles/details/${articleId}`);
        })
        .catch(next);
});

router.get('/delete/:articleId', isLogged, (req, res, next) => {
    const articleId = req.params.articleId;
    articleService.remove(articleId)
        .then(() => {
            res.redirect('/articles');
        })
        .catch(next);
});

module.exports = router;
