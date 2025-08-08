require('dotenv').config();
const jwt = require('jsonwebtoken');
var authDao = require('../Dao/authDao')

async function loginUser(data) {
  const res = await authDao.loginDao(data);
  if (res && res.success) {
    const user = res.user;

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      success: true,
      message: "Login Successful",
      token,
      user
    };
  }

  return res; // This would handle unexpected cases
}

async function signinUser(data){
    const res = await authDao.signInDao(data)
    if(res && res.success){
      const user = res.user;

      const payload = {
        id : user._id,
        name : user.name,
        email : user.email
      }
    const token = jwt.sign(payload, process.env.JWT_SECRET ,{ expiresIn: '1h' });

    return {
      success:true,
      message:"SignIn Successfull",
      token,
      user
    }
    }
    return res
}

module.exports={
    loginUser,
    signinUser
}