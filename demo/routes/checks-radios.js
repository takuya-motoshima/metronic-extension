const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('checks-radios');
});
module.exports = router;