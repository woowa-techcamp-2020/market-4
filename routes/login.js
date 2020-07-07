const router = require('express').Router();
const { db, memberDAO } = require('../db.js');


router.get('/', (req, res, next) => {
  let valid;
  res.cookie("loginValid", false);
  res.render('login');
});

router.post('/', async (req, res, next) => {
  const { userid, password } = req.body;
  const result = await memberDAO.confirmUser(userid, password);

  if (!result) {
    res.redirect('/login?isFail=true');
  } else {
    setCookie(res, result);
    res.redirect('/');
  }
});

function setCookie(res, result) {
  res.cookie("userid", result.userid);
  res.cookie("name", result.name);
  res.cookie("email", result.email);
  res.cookie("phone", result.phone);
}

module.exports = router;
