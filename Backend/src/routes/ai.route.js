const express = require('express');
const router = express.Router();
const limitMiddleware = require('../middlewares/limit.middleware');
const aiController = require('../controllers/ai.controller');


router.post('/get-response', limitMiddleware.limitMiddleware, aiController.aiResponse);

module.exports = router;