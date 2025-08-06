var booking = require('../Dao/bookingDao')

async function bookingSrvcs(data){
    var res = await booking.bookingDao(data)
    return res
}

module.exports={
    bookingSrvcs
}