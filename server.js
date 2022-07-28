const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const ejs = require("ejs");
const path = require('path');
const expressLayout = require('express-ejs-layouts');

app.use(express.static('public'));

//app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(4000,()=>{
    console.log(`Listening on ${PORT}`);
});