const bcrypt = require('bcrypt');
const user_db = require('../models/user_db.js')(process.env.DBSCHEMA);
const order_db = require('../models/order_db.js');
const clientProfileController = {
    async renderProfile(req, res) {
        if (!req.isAuthenticated()) return res.redirect('/login');
        const user = await req.user;

        var orders = await order_db.allByUser('Orders', user.ID);
        
        orders.forEach(order => {
            order.OrderDate = new Date(order.OrderDate).toLocaleDateString();
        });
        
        res.render('layouts/client_profile', { user, orders });
    },

    async updateProfile(req, res) {
        if (!req.isAuthenticated()) return res.status(403).send('Forbidden');
        try {
            const user = await req.user;

            const updatedData = {
                id: user.ID,
                name: req.body.name,
                email: req.body.email,
            };

            if (req.body.password) {
                updatedData.password = await bcrypt.hash(req.body.password, 10);
            }

            await user_db.update_User('Users', updatedData);
            res.redirect('/profile');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },
};

module.exports = clientProfileController;
