const router = require('express').Router();
const { db, memberDAO } = require('../db.js');

const SUCCESS_MSG = "로그인이 되어 있는 상태입니다.";
const FAIL_MSG = "아이디 또는 비밀번호를 다시 확인해 주세요";
// const NOT_LOGIN_MSG = "로그인이 안된 상태입니다.";

router.get('/', (req, res, next) => {
  let msg = "";
  if("isLogined" in req.session) {
    if(req.session.isLogined) msg = SUCCESS_MSG;
    else msg = FAIL_MSG;

  }
  res.render('login', {msg});
});

router.post('/', async (req, res, next) => {
  
  const { userId, password, isSavedUserId } = req.body;
  const result = await memberDAO.confirmUser(userId, password);

  if (!result) {
    req.session.isLogined = false;
    res.redirect('/login');
  } else {
    req.session.isLogined = true;
    res.cookie("savedUserId", isSavedUserId ? userId : "");
    res.redirect('/');
  }
});

module.exports = router;
