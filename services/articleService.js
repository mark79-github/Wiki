const {Article} = require('../models');

function create(data, userId) {
    let article = new Article(data);
    article.author = userId;
    return article.save();
}

function getAll() {
    return Article.aggregate().project({'title': 1});
}

function getById(articleId) {
    return Article.findById(articleId).lean();
}

function remove(articleId) {
    return Article.findByIdAndDelete(articleId);
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
}