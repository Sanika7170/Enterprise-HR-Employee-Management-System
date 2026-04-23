const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error in getAll:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (error) {
    console.error('Error in create:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    console.error('Error in update:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error in remove:', error);
    res.status(500).json({ message: error.message });
  }
};
