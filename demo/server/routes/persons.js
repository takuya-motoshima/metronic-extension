const router = require('express').Router();
const {query, body, validationResult} = require('express-validator');

function sortRows(rows, order, dir) {
  return rows.sort((a, b) => dir === 'asc' ?
    (a[order] < b[order]) ? -1 : 1 :
    (a[order] > b[order]) ? -1 : 1
  );
}

function filterRows(rows, searchWord) {
  if (!searchWord)
    return [...rows];
  return rows.filter(row => {
    return row.name.indexOf(searchWord) !== -1;
  });
}

router.get('/', [
  query('draw').not().isEmpty().isInt({min: 0}),
  query('start').not().isEmpty().isInt({min: 0}),
  query('length').not().isEmpty().isInt({min: 1}),
  query('order').not().isEmpty().isIn(['name', 'position', 'office', 'age', 'startDate', 'salary']),
  query('dir').optional({nullable: true, checkFalsy: true}).isIn(['asc', 'desc']),
  query('search.searchWord').optional({nullable: true, checkFalsy: true}).trim().isLength({max: 70})
], (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return void res.status(400).json({errors: errs.array()});
    let rows = require('./persons.json');
    rows = sortRows(rows, req.query.order, req.query.dir);
    const filteredRows = filterRows(rows, req.query.search.searchWord);
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    res.json({
      data: filteredRows.slice(start, start + length),
      recordsTotal: rows.length,
      recordsFiltered: filteredRows.length,
      draw: req.query.draw
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:personId(\\d+)', (req, res, next) => {
  try {
    const rows = require('./persons.json');
    const foundRow = rows.find(row => row.id == req.params.personId);
    res.json(foundRow);
  } catch (err) {
    next(err);
  }
});

router.post('/', [
  body('name').not().isEmpty().trim()
], (req, res, next) => {
  try {
    res.json(`Hi, ${req.body.name}`);
  } catch (err) {
    next(err);
  }
});

router.put('/:personId(\\d+)', [
  body('name').not().isEmpty().trim()
], (req, res, next) => {
  try {
    res.json(`Hi, ${req.body.name}`);
  } catch (err) {
    next(err);
  }
});

router.delete('/:personId(\\d+)', (req, res, next) => {
  try {
    res.json(`Delete the record with ID ${req.params.personId}`);
  } catch (err) {
    next(err);
  }
});
module.exports = router;