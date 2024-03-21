const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

router.post('/createQuery', queryController.createQuery);

module.exports = router;
