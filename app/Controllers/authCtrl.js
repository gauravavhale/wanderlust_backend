var express = require('express')
var router = express.Router()
var regUser = require('../Services/authSrvcs')

router.post('/login', async function (req, res) {
  try {
    const data = req.body;
    const result = await regUser.loginUser(data);
    if (result && result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        token: result.token,       
        user: result.user         
      });
    }

    return res.status(401).json({
      success: false,
      message: result.message || "Login failed"
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

router.post('/signin', async function(req, res, next) {
  try {
    const data = req.body;
    const result = await regUser.signinUser(data);

    res.status(201).json(result); // ✅ Send result directly
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
});

module.exports=router;