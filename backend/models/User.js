
const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  role:{type:String, enum:['HR_ADMIN','MANAGER','EMPLOYEE']},
  lastLogin:Date
}));
