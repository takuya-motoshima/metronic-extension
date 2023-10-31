const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('badges');
});
module.exports = router;
