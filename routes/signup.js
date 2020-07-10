const {convertPasswordWithSalt, makeSalt, convertPassword} = require('../pwCrypto.js');
const router = require('express').Router();
const { db, memberDAO } = require('../db.js');
import validator from '../public/javascripts/validator.js';

router.get('/', (req, res, next) => {
    res.render('signup');
});
router.post('/', async (req, res, next) => {
    const form = req.body;
    const confirm = await checkform(form);
    if (confirm) {  
        const {password, salt} = await convertPassword(form.password);
        const arr = [form.userid, password, salt, form.name, `${form.email_id}@${form.email_domain}`,
            form.phone, form.postcode, form.address1, form.address2, form.advcheck];
        const result = await memberDAO.addUser(arr);
        req.session.userid = form.userid;
        req.session.name = form.name;
        req.session.email = `${form.email_id}@${form.email_domain}`;
        req.session.phone = form.phone;
        res.status(200).json({
            status: true,
            success: true
        });
    } else {
        // 형식 잘못됨.
        res.status(200).json({
            status: true,
            success: false
        })
    }
});

router.get('/complete', (req, res, next) => {
    const {name, userid, email, phone} = req.session;
    // const [name, userid, email, phone] = ["가나다", "userid", "email@email.com", "010-2345-2345"];
    res.render('signupComplete', {name, userid, email, phone});
    // res.render('signupComplete');
});

router.post('/comfirmId', async (req, res, next) => {
    const userid = req.body.userId;
    // const r = await memberDAO.getUserById(userid);
    const result = (await memberDAO.getUserById(userid)) ? true: false;
    res.status(200).json({isUser: result});
});

async function checkform(form) {
    let confirm = true;
    await Object.keys(form).forEach(async (key) => {
        try {
            const res = await validator[key](form[key]);
            if (!res.success) {
                confirm = false;
            }
        } catch (error) {
            return false;
        }
    });
    return confirm;
}

module.exports = router;
