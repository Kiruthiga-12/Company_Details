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
router.get('/company/count',admin.company_count)
router.post('/admin/add_company',multer.multer_option.single('company_logo'),admin.add_company);
router.get('/company_details',admin.get_company_det);
router.get('/get_entire_data',admin.get_entire_data)
router.delete('/delete_company_det',admin.delete_company_det);

module.exports = router;