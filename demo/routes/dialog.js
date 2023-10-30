const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('dialog');
});
module.exports = router;