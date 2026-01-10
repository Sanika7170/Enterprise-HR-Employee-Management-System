
const Department = require('../models/Department');
exports.getAll = async(req,res)=> res.json(await Department.find());
exports.create = async(req,res)=> res.json(await Department.create(req.body));
