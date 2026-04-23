const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/', leaveController.requestLeave);
router.get('/', leaveController.getAllLeaves);
router.patch('/:id', leaveController.updateLeaveStatus);

module.exports = router;
