const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('floating-labels');
});
module.exports = router;