// In controllers/ProductController.js
const user_db = require('../models/user_db.js')(process.env.DBSCHEMA);

const ProductController = {
    async renderProductPage(req, res) {
        const { category, search, page = 1 } = req.query;
        const limit = 10; // Number of products per page

        try {
            // Fetch products and total count
            const { products, total } = await user_db.find_products(
                { category },
                search,
                page,
                limit
            );

            // Fetch all categories for the dropdown
            const categories = await user_db.find_all_categories();

            const totalPages = Math.ceil(total / limit);
            const pagination = Array.from({ length: totalPages }, (_, i) => i + 1);

            res.render('layouts/product_list', {
                products,
                categories,
                currentPage: parseInt(page),
                totalPages,
                pagination,
                category,
                search,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = ProductController;
