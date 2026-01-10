
const r = require('express').Router();
const c = require('../controllers/departmentController');
r.get('/', c.getAll);
r.post('/', c.create);
module.exports = r;
