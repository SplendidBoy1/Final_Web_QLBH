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

        const current_year = new Date().getFullYear();
        const orders_per_year = await order_db.numberOrderPerYear(current_year);

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var orders_per_month = [];
        for (let i = 0; i < 12; i++) {
            var month = months[i];
            var order = orders_per_year.find(order => order.mon === month);
            orders_per_month.push(order ? order.count : 0);
        }

        // console.log(months);
        // console.log(orders_per_month);
        
        res.render('layouts/client_profile', { user, orders, orders_per_month });
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
