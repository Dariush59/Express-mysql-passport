var models = require('../models');
var configedPassport = require('../config/possport');

var authController = {};

authController.login = (req, res) => {
    var { username, password } = req.body;
    if (!username && !password) {
        res.status(500).json({ succes: false, message: 'username and password are required.' });
    }
    console.log(username, password);
    models.User
        .findOne({ where: { username: username } })
        .then(function(result) {
            if (result.password === password) {
                var payload = { id: result.id };
                console.log('payload id', payload);
                console.log('configedPassport.jwtOptions.secretOrKey', configedPassport.jwtOptions.secretOrKey);
                var token = configedPassport.jwt.sign(payload, configedPassport.jwtOptions.secretOrKey);
                res.status(200).json({ succes: true, data: { token: token } });
            } else {
                res.status(401).json({ succes: false, message: "passwords did not match" });
            }
        })
        .catch(function(error) {
            res.status(401).json({ succes: false, message: "no such user found" });
        });
};




module.exports = authController;