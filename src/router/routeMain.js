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
route.get('/profile/:id', new MainControllers().profile);
route.get('/editProfile/:id', new MainControllers().editProfile);
route.get('/registerEtude/:id', new CandidatControllers().registerEtude);
route.get('/registerExperience/:id', new CandidatControllers.registerExperience);
route.post('/updateCandidat/:id', new CandidatControllers().updateCandidat);
route.post('/updateEtude/:id', new CandidatControllers().updateEtude)
route.post('/updateExperience/:id', new CandidatControllers().updateExperience);
module.exports = route;