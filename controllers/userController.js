var models = require('../models');

var userController = {};

userController.create = (req, res) => {
    var { username, password } = req.body;
    if (!username) {
        res.status(500).json({
            succes: false,
            message: 'username is required.'
        });
    }
    models.User
        .create({
            username: username,
            password: password
        })
        .then(function(result) {
            res.status(200).json({
                succes: true,
                data: result
            });
        })
        .catch(function(error) {
            res.status(500).json({
                succes: false,
                message: error
            });
        });
};

userController.destroy = (req, res) => {
    models.User
        .destroy({
            where: {
                id: req.params.user_id
            }
        })
        .then(function(result) {
            res.status(200).json({
                succes: true,
                data: result
            });
        })
        .catch(function(error) {
            res.status(500).json({
                succes: false,
                message: error
            });
        });
};

module.exports = userController;