var express = require('express');
var router = express.Router();


const mongoose = require('mongoose')
//require in controllers after

const Models = require('../models/flights')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { });
});

router.post('/', function(req, res, next) {
  
  res.redirect('/')
});


router.get('/flights', async (req, res, next) =>{
    // const newFlight = new Models.Flight({
    //     airline: 'Southwest', airport: 'DFW', flightNo: 993, departs:Date.now()
    // })
    // await newFlight.save()
  const allFlights = await  Models.Flight.find({})
res.render('index', {flights: allFlights})
}), 


router.get('/new',(req, res, next) =>{

    res.render('./addFlight')
    }), 


router.post('/new', async function(req, res, next) {
    const newFlight = new Models.Flight({
        airline: req.body.name,
        airport: req.body.airport, 
        flightNo: req.body.flightNo, 
        departs:req.body.Date
    })
   await  newFlight.save()

    //const newData = req.body
  //const newFlight = new Models.Flight({newData})

 
  
  //const newFlight = new Models.Flight({
    
//   })
    res.redirect('/flights')
  });
  

  /* GET users listing. */
router.get('/add', function(req, res, next) {
    res.render('./addFlight', {})
  
  });

//show flight
  router.get('/show:id', async function(req, res, next) {

   
    const searchFlight = req.params.id
    const allFlights = await Models.Flight.findById(searchFlight)
   
    
    res.render('showFlight', {flight: allFlights,
    req:req})

   
  });
  

  //route to post desitnation
  router.post('/show:id', async function(req,res, next){
    //console.log(req.body)
    // console.log(req.params.id)
    // const newDest = new Models.Destination({

    //     airport : req.body.airport,
    //     arrival: req.body.Date
      
    // })

    const searchFlight = req.params.id
    const allFlights =  await Models.Flight.findById(searchFlight)
    

    allFlights.destinations.push(
        {
      airport : req.body.airport,
     arrival: req.body.Date
    })

    
await  allFlights.save()
//     //const allFlights = await Models.Flight.findById(searchFlight)
  res.redirect(201, `/show${searchFlight}`)
  })



//tickets router
  router.post('/show/tickets/:id', async function(req,res, next){
    const searchFlight = req.params.id
    const allFlights =  await Models.Flight.findById(searchFlight)
  
   allFlights.tickets.push(
      {
        seat: req.body.seat,
        flight: searchFlight.flight

  })

 await allFlights.save()

console.log(allFlights)

res.redirect(201, `/show${searchFlight}`)
})

module.exports = router;
