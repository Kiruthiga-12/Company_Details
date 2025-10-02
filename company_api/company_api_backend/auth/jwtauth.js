
const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    jwt.verify({emailid:req.body.email},process.env.SECRET_KEY,(err,val)=>{
        if(err)
            res.json({msg:err})
        else
        {
            if(val)
                next();
           else
              res.json({msg:"Login Id doesn't match"})
        }
    })
  
}

const verifyOtp = (req,res,next)=>{
    try{
         const jwt_compare = jwt.verify(req.headers.jwt_otp_token,process.env.SECRET_KEY);
         if(jwt_compare != undefined)
            next();
         else
            throw new Error('Otp doesnot match!!');
    }
    catch(err){
        next(err)
    }
}

module.exports=  {verifyToken,verifyOtp};