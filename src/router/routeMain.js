const express = require('express');
const CandidatControllers = require('../Controllers/CandidatControllers');
const MainControllers = require('../Controllers/MainControllers');
const EmploisControllers = require('../Controllers/EmploisControllers');
const TableCandidat = require('../model/Table/TableCandidat');
const route = express.Router();

route.get("/500", new MainControllers().serverCrached);
route.get('/allEmplois', new EmploisControllers().allEmplois)
route.get('/', new MainControllers().home);
route.get('/login', new MainControllers().login);
route.get("/about", new MainControllers().about);
route.get("/contact", new MainControllers().contact);
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
route.get('/refuserCandidat/:id', new EmploisControllers().refuserCandidat);
route.get('/deleteApplication/:id', new CandidatControllers().deleteApplication)
// Route post
route.post('/registerEtude/:id', new CandidatControllers().registerEtude);
route.post('/registerExperience/:id', new CandidatControllers().registerExperience);
route.post('/updateCandidat/:id', new CandidatControllers().updateCandidat);
route.post('/updateEtude/:id', new CandidatControllers().updateEtude)
route.post('/updateExperience/:id', new CandidatControllers().updateExperience);
route.post('/addEmplois/:id', new EmploisControllers().addEmploi);
route.post('/addEtude/:id', new CandidatControllers().registerEtude);
route.post('/feedBack', new MainControllers().feedBack);



route.get("/allcandidat", (req, response)=>{
    new TableCandidat().allCandidat()
    .then(candidat=>{
        console.log(req.protocol + '://' + req.get('host'))
        response.send(candidat);
    })
})
module.exports = route;