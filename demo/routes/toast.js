const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('toast');
});
module.exports = router;