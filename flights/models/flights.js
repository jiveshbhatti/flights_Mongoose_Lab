
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({


    seat: {type: String, match: /[A-F][1-9]\d?/},

    price: Number,
    flight: 
    {
        type: mongoose.Types.ObjectId,
        ref: 'Flight'
}

})

const Ticket = mongoose.model('Ticket', ticketSchema)

    const destinationSchema = new mongoose.Schema({
 
        airport:   {
            type: String,
            enum: ['AUS', 'DFW', 'DEN', 'LAX' , 'SAN'],
            
        },
           
        arrival: {
           type: Date,}
    })
    
    const Destination = mongoose.model('Destination', destinationSchema)
    
    
    

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest' , 'United'],
    },
    airport:   {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX' , 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        require: true,
        min: [10 - 9999]},
       
    departs: {
       type: Date,
        default: Date.now() },

    destinations: [destinationSchema],

    tickets: [ticketSchema]
    
})

const Flight = mongoose.model('Flight', flightSchema)


module.exports ={

    Flight,
    Destination,
    Ticket
    
}