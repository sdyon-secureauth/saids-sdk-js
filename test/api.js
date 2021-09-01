var express = require('express');
var router = express.Router();

const { SecureAuth } = require('../SecureAuth');
const api = new SecureAuth();

router.get('/:user', function(req,res) {
    api.user.getUser('userName eq "'+req.params.user+'"').then(result => res.json(result));
});

router.get('/createuser/:user', function(req,res) {
    let user = api.models.user;
    user.userName = req.params.user;
    user.password = 'test12345Super';
    user.email = 'test@test.com';
    user.familyName = 'Tester';
    user.givenName = 'Test';
    

    api.user.createUser(user).then(result => res.json(result));
});

module.exports = router;