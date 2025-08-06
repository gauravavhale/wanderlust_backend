var mongo = require ('mongodb')


async function bookingDao(data){
    try{
    const mongoClient = mongo.MongoClient
    const mongoServer = await mongoClient.connect('mongodb+srv://avhalegaurav07:broispro.07@swift-cart.ajzmudj.mongodb.net/')
    const db = mongoServer.db('Travel-Agency')
    const collection = db.collection('bookings')
    const result = await collection.insertOne(data)
    if(result.acknowledged && result.insertedId){
        const booking = await collection.findOne({ _id: result.insertedId });
        return booking;
    } else {
        throw new Error("Booking failed to save");
    }
    } catch (error) {
    console.error("DAO Error:", error.message);
    throw error; // rethrow to be handled in service or route
  }   
}

module.exports={
    bookingDao
}