const admin = require('../../Firebase/index')
const userModel = require('../../Models/userModel')

exports.authCheck = async (req,res,next) => 
{
    //console.log(req.headers)

    try {

        const fbUser = await admin.auth().verifyIdToken(req.headers.authtoken)

        
        req.body.user = fbUser
        
    } 
    
    catch (err) {
        res.status(401).json({message:"invalid or expired token"})
    }

    next()
}


exports.adminCheck = async (req, res, next) => {

  
  const { email } = req.body.user;

  const adminUser = await userModel.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
