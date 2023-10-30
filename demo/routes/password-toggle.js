const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('password-toggle');
});
module.exports = router;