const order_db = require('../models/order_db.js');

module.exports = {
    OrderDetail: async (req, res) => {
        if (!req.isAuthenticated()) 
            return res.redirect('/login');
        
        const order_id = req.params.id;

        const order = await order_db.get('Orders', order_id);

        res.render('layouts/order_detail', { order });
    }
}