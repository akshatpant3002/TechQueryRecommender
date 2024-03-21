const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Route to get all departments
router.get('/departments', departmentController.getAllDepartments);

// Route to create a new department
router.post('/createDepartment', departmentController.createDepartment);

// Route to delete a department
router.delete('/departments/:departmentId', departmentController.deleteDepartment);

module.exports = router;
