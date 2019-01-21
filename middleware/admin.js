
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports =function(req,res,next){



    if(!isAdmin) return res.status(403).send('unhautorized access ');
    next();


}