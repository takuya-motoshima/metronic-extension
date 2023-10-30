const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('modal');
});
module.exports = router;