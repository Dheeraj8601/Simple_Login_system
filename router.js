var express=require('express')
var router=express.Router();

const credential = {
    email : 'takilatakilar@gmail.com',
    password:"admin123"
}

router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard')
        //res.end("Login successfull");
    }else{
        res.end("Invalid Username")
    }
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorized user")
    }
})

//rote for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{titl:"Express",logout:"Logout Successful...!"})
        }
    })
})

module.exports=router;