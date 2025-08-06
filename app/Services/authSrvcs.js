var authDao = require('../Dao/authDao')

async function loginUser(data){
    const res = await authDao.loginDao(data)
    return res 
}

async function signinUser(data){
    const res = await authDao.signInDao(data)
    return res
}

module.exports={
    loginUser,
    signinUser
}