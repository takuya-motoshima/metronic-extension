const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('alerts');
});
module.exports = router;