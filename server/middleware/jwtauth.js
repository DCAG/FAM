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
    // authorization expected to be === 'Bearer "token"'
    if (!authorization) {
        console.log('must be logged in')
        return res.status(403).send({
            name: "RESTRICTED_PAGE_ACCESS_MISSING_TOKEN",
            message: "This page is accessible only to users who are logged in. If you are logged in already please send the request with the authorization token.",
            action: { // suggested action
                type: "retry",
                to: req.originalUrl
            }
        })
    }

    console.log("1-authorization", authorization)

    // Removing 'Bearer ' prefix to get the token
    const token = authorization.replace("Bearer ", "");
    console.log("2-authorization", token)

    //Verifying if the token is valid.
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).send({
                name: "RESTRICTED_PAGE_ACCESS_INVALID_TOKEN",
                message: "This page is accessible only to users who are logged in with a valid(!) token.",
                action: { // suggested action
                    type: "redirect",
                    to: "login"
                }
            })
        } 

        req.user = payload;
        next();
    });
};