const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('toggle-button');
});
module.exports = router;