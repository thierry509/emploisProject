const express = require('express');
const CandidatControllers = require('../Controllers/CandidatControllers');
const MainControllers = require('../Controllers/MainControllers');
const AuthControllers = require('../Controllers/AuthControlers');
const EmploisControlers = require('../Controllers/EmploisControllers');
const route = express.Router();

route.get('/', new MainControllers().home);
route.get('/login', new MainControllers().login);
route.get('/sign-in', new MainControllers().signIn)
route.get('/candidat', new CandidatControllers().allCandidat);
route.get('/emplois/:id', new MainControllers().emploisDetails)
// route.get(assert)
module.exports = route;