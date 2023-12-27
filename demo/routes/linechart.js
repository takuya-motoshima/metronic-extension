const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('linechart');
});
module.exports = router;