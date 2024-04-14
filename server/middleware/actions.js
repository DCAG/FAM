const usersSvc = require('../services/usersService')

/**
 * user actions middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns output of next middleware call
 */
module.exports = async (req, res, next) => {
    // req.user is populated in jwtauth middleware - so this middleware must be configured after it.
    // if req.user doesn't exist - this middleware is skipped. there is no user to connect this action to.
    console.log("actions middleware/user from JWT token", req.user)
    console.log("actions middleware/userId", req.user?.user?._id)
    if(req.user){
        try{
            await usersSvc.performAction(req.user.user?._id)
        }
        catch(error){
            if(error.name == "DAILY_MAX_ACTIONS_REACHED"){
                return res.status(403).send(error)
            }
            else{
                console.log("actions middleware/other error:", error)
                throw error
            }
        }
    }
    next();
};