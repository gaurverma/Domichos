const User = require('../../models/user');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
function homeController(){
    return{
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
        },
        postLogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error',info.message);
                    return  res.redirect('/login');
                }
                req.logIn(user,()=>{
                    if(err){
                        req.flash('error',info.message);
                        return next(err);
                    }
                    return res.redirect('/');
                })
            })(req,res,next);
        },
        async Postregister(req,res){
            const {name,email,password} = req.body;
            
            if(!name || !email || !password){
                try{
                    req.flash('error','All fields are required');
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register');
                }catch{
                    (err)=>{
                        console.log(err);
                    }
                }
                
            }

            //single email single account
            User.find({email:req.body.email},async(err,result)=>{
                const isEmpty = Object.keys(result).length === 0;
                console.log(isEmpty);
                if(!isEmpty){
                    console.log(result);
                    req.flash('error','User Already Registered');
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register');
                }else{
                     //Hash Password

                    const hashedPassword  = await bcrypt.hash(password,10);

                       //Creating a user
                    const user = new User({
                        name:name,
                        email:email,
                        password:hashedPassword
                    })

                   user.save().then((user)=>{
                       return res.redirect('/');
                       }).catch(err =>{
                       req.flash('error','Something went wrong');
                       return res.redirect('/register');
                   })
        
                }
            })
            
    },
    logout(req, res,next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        }); 
    }
}
}

module.exports = homeController;