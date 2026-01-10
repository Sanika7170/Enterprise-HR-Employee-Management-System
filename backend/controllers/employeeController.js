
const Employee = require('../models/Employee');
exports.getAll = async(req,res)=> res.json(await Employee.find());
exports.create = async(req,res)=> res.json(await Employee.create(req.body));
exports.update = async(req,res)=> res.json(await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true}));
exports.remove = async(req,res)=> { await Employee.findByIdAndDelete(req.params.id); res.json({message:'Deleted'}); };
