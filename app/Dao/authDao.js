require('dotenv').config();
const mongo = require('mongodb');

async function loginDao (data) {
    try{
    const mongoClient = mongo.MongoClient
    console.log("Mongo URI:", process.env.MONGODB_URI);
    const mongoServer = await mongoClient.connect(process.env.MONGO_URI)   
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
    return {
      success: true,
      user: userWithoutPassword
    };
    } catch(error){
        console.log("DAO",error);
        throw error;
    }
}

async function signInDao(data){
  try{
    const mongoClient = mongo.MongoClient
    const mongoServer = await mongoClient.connect(process.env.MONGO_URI)
    const db = mongoServer.db('Travel-Agency')
    const collection = db.collection('users')
    const existingUser = await collection.findOne({email : data.email})
    if(existingUser){
      throw new Error ("User already exists. Please log in instead.")
    }
    const result = await collection.insertOne(data)
     if (result.acknowledged) {
      const { password, ...userWithoutPassword } = await collection.findOne({ _id: result.insertedId });
      return {
        success: true,
        user: userWithoutPassword
      };
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
