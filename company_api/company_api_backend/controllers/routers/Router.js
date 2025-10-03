const express = require('express');
const router = express.Router();
const admin = require('./admin_routers/admin_router')
const bp = require('body-parser');
const urlencode = bp.json();
const verifyToken = require('../../auth/jwtauth');
const multer = require('../../file_uploads/uploads');

router.get('/',(req,res)=>{
    res.send('New request')
})

//admin
router.get('/admin/count',admin.admin_count)
router.post('/admin/signup' , urlencode ,admin.admin_signup)
router.post('/admin/login' , urlencode ,admin.admin_login)
router.get('/admin/sendotp',admin.admin_sendotp);
router.post('/admin/verifyotp',urlencode,verifyToken.verifyOtp,admin.admin_verify_otp);
router.post('/admin/add_company',multer.multer_option.single('company_logo'),admin.add_company);

module.exports = router;