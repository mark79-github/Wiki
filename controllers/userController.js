const {Router} = require('express');
const {userService} = require('../services');
const config = require('../config/config');
const {msg}  = require('../config/constants');
const {isGuest, isLogged, validate} = require('../middlewares');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('users/login',);
});

router.post('/login', isGuest, validate.user.login, (req, res) => {
    userService.login(req.body)
        .then((token) => {
            if (!token) {
                throw {message: msg.WRONG_CREDENTIALS};
            }
            const cookieOptions = {maxAge: 1000 * 60 * 60, httpOnly: true}
            return res
                .cookie(config.authCookie, token, cookieOptions)
                .redirect('/');
        })
        .catch((error) => {
            res.render('users/login', {message: error.message});
        });
});

router.get('/register', isGuest, (req, res) => {
    res.render('users/register');
});

router.post('/register', isGuest, validate.user.register, (req, res) => {
    userService.register(req.body)
        .then(() => {
            return userService.login(req.body);
        })
        .then((token) => {
            if (!token) {
                throw {message: msg.WRONG_CREDENTIALS};
            }
            const cookieOptions = {maxAge: 1000 * 60 * 60, httpOnly: true}
            return res
                .cookie(config.authCookie, token, cookieOptions)
                .redirect('/');
        })
        .catch(error => {
            res.render('users/register', {message: error.message});
        });
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(config.authCookie);
    res.redirect('/users/login');
});

module.exports = router;
