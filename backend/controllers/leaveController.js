const Leave = require('../models/Leave');

exports.requestLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
