const admin_table = require('../../../models/Admin/admin_model');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: path.join(process.cwd()+'/config/.env')});
const jwt = require('jsonwebtoken');
const otp = require('otp-generator');
const fs = require('fs');
const company_table = require('../../../models/Company/company_model');


//Email setup
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.FROM_MAILID,
        pass:process.env.MAILID_PWD
    }
})


//Admin count
const admin_count= async(req,res,next)=>{
 
 try{
     const count = await admin_table.countDocuments();

        if(count != undefined)
             res.json({count:count})
    }
    catch(err){
            next(err)
    }
}


//Admin Signup
const admin_signup = async(req,res,next)=>{
let  password = bcrypt.hashSync(req.body.password,10);
try{
    const newData = await admin_table.create({
    id:req.body.id,
    emailid:req.body.email,
    name:req.body.name,
    password:password
    })
    
    if(newData != undefined)
     res.render(path.join(process.cwd()+'/views/adminSignup.ejs'),{name:req.body.name},(err,info)=>{
        
        const message = {
        from : process.env.FROM_MAILID,
        to : newData.emailid,
        subject:'Signup Mail Confirmation !!',
        html: info
        }

        if(err)
            next(err)
           
        transport.sendMail(message,(err,info)=>{
              if(err)
                next(err)
                 
              else
                    res.json({msg:"success"})
              })
        })
 
else{
    const error = new Error('Unable to create User!')
    error.status = 500;
    next(error)
}
   }
catch(err){
    next(err)
    }
}


//Admin Login
const admin_login = async (req,res,next)=>{
    try{
let admin = await admin_table.find({emailid:req.body.email})

if(admin.length>0)
    {
let result =  bcrypt.compareSync(req.body.password,admin[0].password);

if(result === true)
      res.json({msg:"success"})
else{
                const error = new Error('Password doesnot match!!');
                error.status = 400;
                next(error)
    }
}
else{
    const error = new Error('User Details not found!');
    error.status = 400;
    next(error)
}
    }
    catch(err){
        next(err)
    }
}

//admin send otp
const admin_sendotp = (req,res,next)=>{
    try{
    
 let otp_val = otp.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false,digits:true})
if(otp_val != undefined)
{
    const message={
    from:process.env.FROM_MAILID,
    to:req.query.email,
    subject:'OTP verification',
    html:`<h4>Dear user,</h4>
    <p>Kindly enter OTP ${otp_val} to login.</p>
    <p>Otp is valid only for 10 minutes</p>
    <p>Regards</p>
    <p>Company API </p>`
}
transport.sendMail(message,(err,info)=>{
    if(err)
       next(err)
    else{
        const jwt_token = jwt.sign({email:req.query.email,otp:otp_val},process.env.SECRET_KEY,{expiresIn:600});
        if( jwt_token != undefined){
            res.json({token:jwt_token})
        }
        else
              throw new Error('Error Please retry!')
        }
        
})
}
else{
    throw new Error('Couldn\'t generate OTP');
}
    }
    catch(err){
        next(err)
    }
}

//verify otp
const admin_verify_otp = async(req,res,next)=>{
try{
        const admin_data = await admin_table.find({emailid:req.body.email})

        if(admin_data.length>0)
        {

                  jwt.sign({email:req.body.email},process.env.SECRET_KEY,{expiresIn:"3d"},(err,token)=>{
                        if(err)
                             next(err)
                        res.json({token:token})
                     })
        }
       else{
                    const error = new Error('User details not found!!');
                    error.status = 400;
                    next(error)
        }
}
catch(err){
          next(err)
}
   
}

//company count 
const company_count = async(req,res)=>{
    try{
        const count = await company_table.countDocuments();
        if(count!= undefined )
             res.json({count:count})

    }
    catch(err){
        next(err);
    } 
}
//add new company
const add_company = async(req,res,next)=>{
    try{
   const find_by_name = await company_table.find({name:req.body.name});

   if(find_by_name.length == 0 )
   {
    const add_value = await company_table.create({
    id: req.body.id,
    name: req.body.company_name,
    about: req.body.about_company,
    year: req.body.founded_year,
    employee_count: req.body.emp_count,
    company_type: req.body.company_type,
    total_revenue: req.body.revenue,
    logo: fs.readFileSync(req.file.path)
   })

    if (add_value != undefined || add_value!='')
        res.json({msg:'Data created succesfully!!'})
    else
    {
        const error = new Error('Unable to save Company details');
        error.status = 500;
        next(error)
    }
    }
else{
        const error = new Error('Company Details already exist!!');
        error.status = 500;
        next(error)
    }
    }
    catch(err)
     { 
        next(err)
     }
}

//get company_details
const get_company_det = async(req,res,next)=>{
    try{
    const details = await company_table.find();
    if(details && details.length>0){
      res.send(details.map((li)=> {
        return{
        id:li.id,
        name:li.name,
        about: li.about
        }
      }))
    }
    else
        res.json({msg:"No details found"})
    }
        catch(err){
    next(err)}
}

//get entire company details
const get_entire_data = async(req,res,next)=>{
    try{
    const data = await company_table.find({id:req.query.id});

    if(data.length>0)
        res.send(data)
    else
        res.json({msg:'No data'})
    }
    catch(err){
        next(err)
    }
}

//delete company details.
const delete_company_det = async(req,res,next)=>{
    try{
        const data = await company_table.find({id:req.query.id});
        if(data.length>0)
        {
            const del_dat = await company_table.deleteOne({id:req.query.id});
            if(del_dat.deletedCount == 1)
                res.json({msg:"success"})
            else{
                  const error = new Error('Unable to delete Entries')
                  error.status = 500;
                  next(error)
            }

        }
        else{
            const error = new Error('No details found!!')
            error.status = 400;
            next(error)
        }
    }
    catch(err){
        next(err)
    }
}
module.exports = {admin_signup,admin_count,admin_login,admin_sendotp,admin_verify_otp,add_company,company_count,get_company_det
    ,get_entire_data,delete_company_det
}