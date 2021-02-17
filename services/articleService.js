const {Article} = require('../models');

function create(data, userId) {
    let article = new Article(data);
    article.author = userId;
    return article.save();
}

function getAll(query) {
    let queryParams = {};

    if (query) {
        queryParams.title = new RegExp(query, 'i');
    }

    return Article.aggregate()
        .match(queryParams)
        .project({
            "title": 1,
        });
}

function getLastThree() {
    return Article.aggregate()
        .project({
            title: true,
            description: true,
            creationDate: true,
            words: {$slice: [{$split: ["$description", " "]}, 0, 50]} // първите 50 думи
            // "description": {$substr: ["$description", 0, 50]}, // първите 50 символа
        })
        .sort({creationDate: 1})
        .limit(3);
}

function getById(articleId) {
    return Article.findById(articleId).lean();
}

function edit(articleId, data) {
    return Article.findByIdAndUpdate(articleId, data);
}

function remove(articleId) {
    return Article.findByIdAndDelete(articleId);
}

module.exports = {
    create,
    edit,
    remove,
    getAll,
    getLastThree,
    getById,
}