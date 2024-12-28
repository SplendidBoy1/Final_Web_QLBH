const order_db = require('../models/order_db.js');
const product_db = require('../models/product_db.js');

module.exports = {
    OrderDetail: async (req, res) => {
        if (!req.isAuthenticated()) 
            return res.redirect('/login');
        
        const order_id = req.params.id;

        const order = await order_db.one('Orders', 'OrderID', order_id);

        var products = await order_db.allBy('OrderDetails', 'OrderID', order_id);

        products.forEach(async (product) => {
            const product_info = await product_db.one('Products', 'ProID', product.ProID);            
            product.ProName = product_info.ProName;
            product.Image = product_info.Image_Src;            
        });
        // console.log(products);

        res.render('layouts/order_detail', { order, products });
    }
}