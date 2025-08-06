var express = require('express')
var router = express.Router()
var regUser = require('../Services/authSrvcs')

router.post('/login', async function (req, res) {
  try {
    const data = req.body;
    const result = await regUser.loginUser(data);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });

  } catch (error) {
    console.error("Login Route Error:", error.message);

    // Handle specific DAO error messages
    if (error.message === "User Not Registered") {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    if (error.message === "Wrong Password") {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    // Default: Internal Server Error
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
});

router.post('/signin', async function(req,res,next){
    try{
        const data = req.body;
        const result = await regUser.signinUser(data)
        res.status(201).json({success:true,message:'User Registered successfully',data:result})
    } catch(error){
        res.status(500).json({success:false, message:error.message || "Internal Server Message"})
    }
    
})

module.exports=router;