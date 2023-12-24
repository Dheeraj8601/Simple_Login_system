const express = require('express')
const app=express();
const bodyparser=require('body-parser')
const path=require('path')
const session=require('express-session')
const { v4:uuidv4}=require('uuid');

const router=require('./router.js')

const PORT=process.env.PORT || 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))

app.set('view engine','ejs');

//load static assest
app.use("/static", express.static(path.join(__dirname, 'public')))
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router)

app.set('views', path.join(__dirname));

//home route
app.get("/",(req,res)=>{
    res.render('base',{titl:"login system"})
})

app.listen(PORT,()=>{
    console.log('Listening to the server on http://localhost:3000')
})