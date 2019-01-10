
function martin(req,res,next){

console.log("pase por facade martin");
next();

}

module.exports = martin;