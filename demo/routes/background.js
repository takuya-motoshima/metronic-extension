const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('background');
});
module.exports = router;