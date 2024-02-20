const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // Extracting JWT secret from environment variable
    const JWT_SECRET = 'some_key' //process.env.JWT_SECRET;
    //Extracting token from authorization header
    const authorization = req.headers['x-access-token'] //req.headers;
    console.log("inside jwtauth middleware!")
    // Checking if authorization header is present
    //authorization === 'Bearer "token"'
    if (!authorization) {
        console.log('must be logged in')
        return res.status(404).send({ error: "Must be logged in" });
    }

    // Removing 'Bearer ' prefix to get the token
    //const token = authorization.replace("Bearer ", "");
    const token = authorization
    //Verifying if the token is valid.
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).send("Could not verify token");
        }

        console.log("payload", payload)
        // Adding user information to the request object
        req.user = payload;
    });
    next();
};