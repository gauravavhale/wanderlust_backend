const mongo = require('mongodb');

async function loginDao (data) {
    try{
    const mongoClient = mongo.MongoClient
    const mongoServer = await mongoClient.connect('mongodb+srv://avhalegaurav07:broispro.07@swift-cart.ajzmudj.mongodb.net/')   
    const db = mongoServer.db('Travel-Agency')
    const collection = db.collection("users")
    const result = await collection.findOne({email : data.email})
    if(!result){
        throw new Error('User Not Registered')
    }
    if(result.password !== data.password){
        throw new Error('Wrong Password')
    }
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword; 
    } catch(error){
        console.log("DAO",error);
        throw error;
    }
}

async function signInDao(data){
  try{
    const mongoClient = mongo.MongoClient
    const mongoServer = await mongoClient.connect('mongodb+srv://avhalegaurav07:broispro.07@swift-cart.ajzmudj.mongodb.net/')
    const db = mongoServer.db('Travel-Agency')
    const collection = db.collection('users')
    const existingUser = await collection.findOne({email : data.email})
    if(existingUser){
      throw new Error ("User already exists. Please log in instead.")
    }
    const result = await collection.insertOne(data)
     if (result.acknowledged) {
      const { password, ...userWithoutPassword } = await collection.findOne({ _id: result.insertedId });
      return userWithoutPassword;
    } else {
      throw new Error("User Registration Failed");
    }
  } catch(error){
    console.error("DAO Error:", error.message);
    throw error;
  }
}

module.exports = {
  loginDao,
  signInDao
};
