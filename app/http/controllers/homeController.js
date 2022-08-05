const Menu = require('../../models/menu');
function homeController(){
    return{
        async index(req,res){
            const pizzas = await  Menu.find();
            return res.render('home',{pizzas:pizzas});
            // Menu.find().then(
            //     function(pizaas){
            //         console.log(pizaas);
            //         return res.render('home',{pizaas:pizaas})
            //     }
            // )
        }
    }
}

module.exports = homeController;