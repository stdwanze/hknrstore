const config = require('./config');

function authenticate(req,res,next){
    req.token = req.headers['authsecret'];

    req.token ? next() : (req.token = req.query["authsecret"] );
    req.token ? next() :     ((res.statusCode=401) && res.end('No token!'));

}
function authorize(req,res,next){
    if(config.authtoken == null || config.authtoken.length < 10 )  ((res.statusCode=401) && res.end('Bad token!'));
    if(req.token == config.authtoken) next();
}
function cors (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://platform.appgyver.com"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };

module.exports = {
    authenticate,
    authorize,
    cors
}