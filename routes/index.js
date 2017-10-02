var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

// importing passport config
var cnfgdPsprt = require('../config/possport');


// passport routes
router.post("/login", authController.login);

router.get("/secret", cnfgdPsprt.is_authenticated, function(req, res) {
    res.json({ message: "Success! You can not see this without a token" });
});


module.exports = router;