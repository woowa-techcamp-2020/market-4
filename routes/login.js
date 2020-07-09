const router = require('express').Router();
const { db, memberDAO } = require('../db.js');

console.log(db, memberDAO);

router.get('/', (req, res, next) => {
  let valid;
  let msg = "";
  if("isLogined" in req.session) {
    if(req.session.isLogined) msg = "로그인이 성공된 상태입니다.";
    else {
      req.session.destroy(()=>{req.session});
      msg = "아이디 또는 비밀번호를 다시 확인해 주세요.";
    }
  } else {
    msg = "로그인이 안된 상태입니다."
  }
  console.log(msg);
  res.render('login', {msg});
});

router.post('/', async (req, res, next) => {
  
  const { userid, password } = req.body;
  const result = await memberDAO.confirmUser(userid, password);

  if (!result) {
    req.session.isLogined = false;
    res.redirect('/login');
  } else {
    req.session.isLogined = true;
    res.redirect('/');
  }
});

function setSessionInfo(session, result) {
  session.userid = result.userid;
  session.name = result.name;
  session.email = result.email;
  result.phone = result.phone;
}

function setCookie(res, result) {
  res.cookie("userid", result.userid);
  res.cookie("name", result.name);
  res.cookie("email", result.email);
  res.cookie("phone", result.phone);
}

module.exports = router;
