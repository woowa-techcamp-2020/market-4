const router = require('express').Router();
const {db, memberDAO} = require('../db.js');

router.get('/', (req, res, next) => {
    res.render('signup');
});
router.post('/', (req, res, next) => {
    console.log('req', req.body);
});

router.get('/complete', (req, res, next) => {
    const {name, userid, email, phone} = req.session.userInfo;
    res.render('signupComplete', {name, userid, email, phone});
});

router.post('/comfirmId', async (req, res, next) => {
    const userid = req.body.userId;
    const r = await memberDAO.getUserById(userid);
    const result = (await memberDAO.getUserById(userid)) ? true: false;
    res.status(200).json({isUser: result});
});

module.exports = router;
