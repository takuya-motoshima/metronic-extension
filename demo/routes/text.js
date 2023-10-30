const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('text');
});
module.exports = router;