const {Router} = require('express');
const router = Router();

const {userController, homeController, errorController, articleController} = require('../controllers');

router.use('/', homeController);
router.use('/users', userController);
router.use('/articles', articleController);
router.use('*', errorController);

module.exports = router;
