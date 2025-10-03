const multer = require('multer');
const path = require('path');

//Company_Logo Storage
const storage_opt = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,path.join(process.cwd()+'/files/'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const multer_option = multer({
    storage:storage_opt
})

module.exports = {multer_option}