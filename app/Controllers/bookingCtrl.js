var express = require('express')
var router = express.Router()
var book = require('../Services/bookingSrvcs')

router.post('/bookings', async function(req,res,next){
    try{
        const data = req.body
        const savedBooking = await book.bookingSrvcs(data)
        res.status(201).json({
            success:true,
            message:"Booking Confirmed",
            booking:savedBooking
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:  error.message ||"Falied to Book"
        })
    }
    
})

module.exports = router