const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('cards');
});
module.exports = router;