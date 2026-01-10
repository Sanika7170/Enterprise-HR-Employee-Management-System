
const mongoose = require('mongoose');
module.exports = mongoose.model('Employee', new mongoose.Schema({
  name:String,
  email:String,
  department:String,
  designation:String,
  status:{type:String, default:'Active'},
  manager:String
},{timestamps:true}));
