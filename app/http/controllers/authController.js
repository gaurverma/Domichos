const User = require('../../models/user');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
function homeController(){
    return{
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
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
            User.exist({email:email},(err,result)=>{
                if(result){
                    req.flash('error','User Already Registered');
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register');
                }
            })
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
    }
}

module.exports = homeController;