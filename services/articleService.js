const {Article} = require('../models');

function create(data, userId) {
    let article = new Article(data);
    article.author = userId;
    return article.save();
}

function getAll() {
    return Article.aggregate()
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
            words: {$slice: [{$split: ["$description", " "]}, 0, 50]}
            // "description": {$substr: ["$description", 0, 50]},
        })
        .sort({creationDate: 1})
        .limit(3);


    // return Article.aggregate()
    //     .project({
    //         "title": 1,
    //         "creationTime": 1,
    //         // "words": {$split: ["$description", " "]},
    //         "words": {$slice: [{$split: ["$description", " "]}, 0, 50]},
    //     })
    // .unwind("$words")
    // .group({
    //     _id: "$_id",
    //     // title: "$title",
    //     allWords: {$push: "$words"}
    // })
    // .project({
    //     title: "$title",
    //     wordCount: {$slice: ["$allWords", 0, 49]}
    // })
    // .sort({"creationDate": -1})
    // .limit(3);

}

function getById(articleId) {
    return Article.findById(articleId).lean();
}

function edit(articleId, data) {
    console.log(data);
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