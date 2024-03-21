const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

// Route to get all departments
router.post('/departments', queryController.createQuery);

module.exports = router;
