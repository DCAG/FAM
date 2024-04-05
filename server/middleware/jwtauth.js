const jwt = require('jsonwebtoken')

/**
 * JWT Authentication middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns output of next middleware call
 */
module.exports = (req, res, next) => {
    // Extracting JWT secret from environment variable
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log("JWT_SECRET", JWT_SECRET)
    //Extracting token from authorization header
    const authorization = req.headers['x-access-token'] //req.headers;
    // Checking if authorization header is present
    //authorization === 'Bearer "token"'
    if (!authorization) {
        console.log('must be logged in')
        return res.status(404).send({ error: "Must be logged in" });
    }

    console.log("1-authorization", authorization)

    // Removing 'Bearer ' prefix to get the token
    const token = authorization.replace("Bearer ", "");
    console.log("2-authorization", token)

    //Verifying if the token is valid.
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            console.log("3-error on jwt.verify")
            return res.status(403).send("Could not verify token"); //notice! 'return' statement will exit the callback func but will continue execute outside jwt.verify func!
        } 
        //else{
          // Adding user information to the request object
        req.user = payload;
        next();
        //}
    });
};