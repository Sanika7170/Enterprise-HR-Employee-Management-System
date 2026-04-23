const Department = require('../models/Department');

exports.getAll = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error('Error in getAll departments:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.json(department);
  } catch (error) {
    console.error('Error in create department:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
