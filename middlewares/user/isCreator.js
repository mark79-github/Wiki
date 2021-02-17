const {articleService} = require('../../services');

module.exports = async (req, res, next) => {
    if (req.user) {
        articleService.getById(req.params.articleId)
            .then((article) => {
                res.locals.isCreator = article.author._id.toString() === req.user.id.toString();
                // res.locals.isEnrolled = course.usersEnrolled.some(value => {
                //     return value._id.toString() === req.user.id.toString();
                // })
            });
    }

    next();
}