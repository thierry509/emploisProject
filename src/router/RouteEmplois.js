const express = require('express');
const EmploisControlers = require('../Controllers/EmploisControllers');
const route = express.Router();
route.get('/aa', new EmploisControlers().test);
route.get('/all', new EmploisControlers().allEmplois);
route.get('/recent', new EmploisControlers().recentEmplois);
module.exports = route;