const router = require('express').Router();
const {db, memberDAO} = require('./db');


router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', (req,res,next) => {

})

module.exports = router;
