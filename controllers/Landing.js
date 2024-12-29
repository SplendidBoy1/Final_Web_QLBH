const category_db = require('../models/categoires_db.js');
const product_db = require('../models/product_db.js');
const user_db = require('../models/user_db.js')(process.env.DBSCHEMA);

const df = {
    Landing: async (req, res) => {
        if (!req.isAuthenticated()){
            return res.redirect('/login')
        }
        
        const categories = await category_db.all();        
        const top30Rating = await product_db.top30Rating();


        const userEmail = req.session.passport.user;
        const user = await user_db.findEmail('Users', 'Email', userEmail);
        const userId = user.ID;

        if (!req.session.cart) {
            req.session.cart = [];
        }

        let cartItems = req.session.cart.filter(item => item.ID_User === userId);
        if (cartItems.length <= 0) {
            // Query the database for the cart items
            const cartItems = await user_db.takeCart(userId); 

            // Update the session
            req.session.cart = req.session.cart.concat(cartItems);  
        }

        
        return res.render('layouts/landing', {categories: categories, products: top30Rating});
    }    
}
module.exports = df