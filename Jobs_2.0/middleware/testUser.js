const MetaError = require('../errors/MetaError')

const testUser =(message) =>(req,res,next)=>{
    if(req.user === "6628c371f96d12507b8d12d5"){
    throw new MetaError.BadRequest(`Test is not autherized to perform ${message} operation`)
    }
    next()

}

module.exports = {testUser}