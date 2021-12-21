const User = require('../../Models/userModel')


const createUpdateUser = async (req,res,next)=>
{
    //console.log("req.body.user",req.body.user)

    const {name, picture, email} = req.body.user
    
    const user = await User.findOneAndUpdate({email},{name,picture},{new: true})
    

    //console.log("user is in the createUpdateUser controller ",user)


    if(user) { return res.json(user)}
    else {const newUser = await new User({email,name: email.split('@')[0],picture}).save() 
    
    //console.log("user created",newUser)

    return res.json(newUser)} 

    next()
}


const currentUserController = async (req,res,next)=>
{
    const {email} = req.body.user

     User.find({email: email}).exec((err,arg) => 
                                            {
                                                if(err){throw new Error(err)}

                                                res.json(arg)
                                            })

    
    
    

    next()
}


module.exports={ createUpdateUser,currentUserController }