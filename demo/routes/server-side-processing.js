const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('server-side-processing');
});
module.exports = router;