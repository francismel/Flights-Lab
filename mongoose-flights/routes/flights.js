var express = require('express');
var router = express.Router();

const flightCtrl = require('../controllers/flights');

router.get('/',flightCtrl.index)
router.get('/new',flightCtrl.addFlightPage) 
router.get('/:id',flightCtrl.details)
router.post('/new',flightCtrl.addFlight)
router.post('/:id/destinations',flightCtrl.addFlightDestination)
router.get('/:id/tickets',flightCtrl.ticketPage)
router.post('/:id/tickets',flightCtrl.createTicket)


module.exports = router;
