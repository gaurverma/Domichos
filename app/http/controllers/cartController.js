function cartController(){
    return{
        index(req,res){
            res.render('customer/cart');
        },
        update(req,res){

            if(!req.session.cart){
                req.session.cart = {items: {},totalQty: 0,totalPrice: 0}
            }
            let cart = req.session.cart;

            //check if item already exist in cart, if yes then increase quantity else add the item with quantity 1

            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty:1
                }
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price;
                console.log( req.body.price,cart.totalPrice);
            }else{
                cart.items[req.body._id].qty  =  cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice += cart.totalPrice + req.body.price;
            }
            console.log( req.session.cart.totalQty);
            return res.json({totalQty: req.session.cart.totalQty});
        }
    }
}

module.exports = cartController;