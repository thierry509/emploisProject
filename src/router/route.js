const express = require('express');
const CandidatControllers = require('../Controllers/CandidatControllers');
const route = express.Router();
const pathMain = __dirname + '../../view/';
module.exports = {
    route,
    pathMain
}