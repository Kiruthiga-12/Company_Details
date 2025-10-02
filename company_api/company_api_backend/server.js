const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const mong = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./controllers/routers/Router');
const ejs = require('ejs');

dotenv.config({path: path.join(process.cwd()+'/config/.env')})

mong.connect(process.env.MONGO_DB_CONNECTION)
.then(()=>console.log('Database connected'))
.catch((err)=>console.log(err.message))

app.set('view engine','ejs')
app.use('/',cors(),helmet(), router);

//Error handling
app.use((err,req,res,next)=>{
    const err_status = err.status || 500;
    const message = err?.errmsg ||err.message ||'Error Please try again'
    res.status(err_status).send(message);
})

app.listen(8080,()=>console.log('server is listening...'))