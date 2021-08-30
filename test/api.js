var express = require('express');
var router = express.Router();

const { SecureAuth } = require('../SecureAuth');
const api = new SecureAuth();

router.get('/:user', function(req,res) {
    api.user.getUser('userName eq "'+req.params.user+'"').then(result => res.json(result));
});

module.exports = router;