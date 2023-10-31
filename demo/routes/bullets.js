const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('bullets');
});
module.exports = router;