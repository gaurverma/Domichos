const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const guest = require('../app/http/middlewares/guest');
const cartController = require('../app/http/controllers/cartController');


function initRoutes(app){
    app.get('/',homeController().index);
    app.get('/cart',cartController().index);
    app.get('/login',guest,authController().login);
    app.get('/register',guest,authController().register);

    app.post('/update-cart',cartController().update)
    app.post('/register',authController().Postregister); 
    app.post('/login',authController().postLogin);
    app.post('/logout',authController().logout);
}

module.exports = initRoutes;