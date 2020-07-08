const router = require('express').Router();
const { db, memberDAO } = require('../db.js');

router.get('/', (req, res, next) => {
    res.render('signup');
});
router.post('/', (req, res, next) => {
    req.session.userInfo = '';
    res.redirect('/complete');
});

router.get('/complete', (req, res, next) => {
    // const {name, userid, email, phone} = req.session.userInfo;
    
    const [name, userid, email, phone] = ["가나다", "userid", "email@email.com", "010-2345-2345"];
    res.render('signupComplete', {name, userid, email, phone});
    // res.render('signupComplete');
});

module.exports = router;
