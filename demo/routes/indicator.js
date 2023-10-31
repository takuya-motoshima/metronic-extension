const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('indicator');
});
module.exports = router;