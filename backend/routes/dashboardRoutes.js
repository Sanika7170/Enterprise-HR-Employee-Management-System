const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Leave = require('../models/Leave');
const Department = require('../models/Department');

router.get('/stats', async (req, res) => {
  try {
    const [totalEmployees, activeEmployees, totalDepartments, pendingLeaves] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: 'Active' }),
      Department.countDocuments(),
      Leave.countDocuments({ status: 'Pending' })
    ]);

    res.json({
      totalEmployees,
      activeEmployees,
      totalDepartments,
      pendingLeaves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
