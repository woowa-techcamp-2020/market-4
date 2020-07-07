const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('signup');
});
router.post('/', (req, res, next) => {
    req.session.userInfo = '';
    res.redirect('/complete');
});

router.get('/complete', (req, res, next) => {
    const {name, userid, email, phone} = req.session.userInfo;
    res.render('signupComplete', {name, userid, email, phone});
});

module.exports = router;
