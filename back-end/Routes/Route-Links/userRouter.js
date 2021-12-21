const authRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const { user } = require('../Controllers/userController')



// imported Middlewares-------------------------------------------------------------------------



// Routes-------------------------------------------------------------------------
authRouter.get('/user',user)



module.exports = authRouter


