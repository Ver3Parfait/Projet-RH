require('dotenv').config()
const sharp = require('sharp');
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const db = process.env.BDD_URL
const app = express()
const registerRouter = require('./routes/register.js')
const navigationRouter = require('./routes/navigation.js')
const employeeRouter = require('./routes/employeeRouter.js')
const loginRouter = require('./routes/login.js')
const flash = require('connect-flash')
const { array } = require('./customDependance/multer.js')

app.use(session({secret:"hey",saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json())
app.use(flash())
app.use(express.urlencoded({extended: true}))
app.use(registerRouter)
app.use(navigationRouter)
app.use(loginRouter)
app.use(employeeRouter)
app.use(sharp)

app.listen(process.env.PORT,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Connected');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Connected to DB");
    }
})