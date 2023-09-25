const express = require('express');
const CandidatControllers = require('../Controllers/CandidatControllers');
const MainControllers = require('../Controllers/MainControllers');
const EmploisControllers = require('../Controllers/EmploisControllers');
const route = express.Router();

route.get('/allEmplois', new EmploisControllers().allEmplois)
route.get('/', new MainControllers().home);
route.get('/login', new MainControllers().login);
route.get('/sign-in', new MainControllers().signIn)
route.get('/emplois/:id', new MainControllers().emploisDetails)
route.get('/profile/:id', new MainControllers().profile);
route.get('/editProfile/:id', new MainControllers().editProfile);
route.get('/employeur/:id', new MainControllers().employeurDetails);
route.get('/ajouterEmplois/:id', new MainControllers().addEmplois);
route.get('/application/:id', new MainControllers().application);
route.get('/applicationCandidat/:id', new CandidatControllers().applicationCandidat);
route.get('/applicationEmplois/:id', new EmploisControllers().applicationEmplois);
route.get('/accepterCandidat/:id', new EmploisControllers().accepterCandidat)
// Route post
route.post('/registerEtude/:id', new CandidatControllers().registerEtude);
route.post('/registerExperience/:id', new CandidatControllers().registerExperience);
route.post('/updateCandidat/:id', new CandidatControllers().updateCandidat);
route.post('/updateEtude/:id', new CandidatControllers().updateEtude)
route.post('/updateExperience/:id', new CandidatControllers().updateExperience);
route.post('/addEmplois/:id', new EmploisControllers().addEmploi);
route.post('/addEtude/:id', new CandidatControllers().registerEtude);

module.exports = route;