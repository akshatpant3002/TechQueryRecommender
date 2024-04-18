const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

router.post('/createQuery', queryController.createQuery);
router.post('/deleteQuery', queryController.deleteQuery);


module.exports = router;
