

const Flight = require('../models/flight');
const Ticket = require('../models/ticket')
ObjectId = require('mongodb').ObjectID;


module.exports = {
    index: index,
    addFlightPage: addFlightPage,
    addFlightDestination: addFlightDestination,
    addFlight: addFlight,
    details: details,
    createTicket: createTicket,
    ticketPage: ticketPage,
}


function index(req,res){
    Flight.find({},function(err,flights){
        res.render('index',{title: 'Upcoming Flights',flights});
    });
}

function addFlightPage(req,res){
    res.render('new', { title: 'New Flight Information' });
}

function addFlight(req,res){
    if(req.body.departs === ''){
        const time = Date.now() + 365*24*60*60*1000;
        const date = new Date(time);
        req.body.departs = date;
    }
    let newFlight = new Flight(req.body);
    newFlight.save();
    res.redirect('/flights');
}

function details(req,res){

    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            console.log("tickets for that flight",tickets)
           res.render('flightDetails',{flight: flight,tickets: tickets});
        });
    });
}

function addFlightDestination(req,res){
    Flight.findById(req.params.id, function(err,currFlight){
        currFlight.destinations.push(req.body);
        currFlight.save();
        res.redirect('/flights/'+req.params.id)
        })
   
}


function ticketPage(req,res){
    res.render('ticket')
}

function createTicket(req,res){ //ids of flights and tickets are all mixed up

    console.log("lets create a ticket!")
    let ticketInfo = req.body;
    ticketInfo.flight = req.params.id;

    let ticket = new Ticket(ticketInfo);
    ticket.save()
    console.log("the ticket were saving! ",ticket)
    res.redirect('/flights/'+req.params.id)
}

