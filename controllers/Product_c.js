// In controllers/ProductController.js
const user_db = require('../models/user_db.js')(process.env.DBSCHEMA);

const ProductController = {
    async renderProductPage(req, res) {
        const { category, search, page = 1 } = req.query;
        const limit = 6; // 6 products per page
        const maxPageLinks = 6; // Maximum number of page links to display

        try {
            const { products, total } = await user_db.find_products({ category }, search, page, limit);
            const categories = await user_db.find_all_categories();

            const totalPages = Math.ceil(total / limit);
            const currentPage = parseInt(page);

            // Pagination logic
            let pagination = [];
            const halfMax = Math.floor(maxPageLinks / 2);

            // Generate page numbers with ellipses
            const startPage = Math.max(1, currentPage - halfMax);
            const endPage = Math.min(totalPages, currentPage + halfMax);

            for (let i = startPage; i <= endPage; i++) {
                pagination.push(i);
            }

            // Add ellipses and first/last pages
            if (startPage > 1) {
                pagination.unshift(1, '...');
            }
            if (endPage < totalPages) {
                pagination.push('...', totalPages);
            }

            res.render('layouts/product_list', {
                products,
                categories,
                currentPage,
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

    async renderProductDetails(req, res) {
        const { id } = req.params;

        try {
            // Fetch the main product
            const product = await user_db.find_product_by_id(id);
            if (!product) return res.status(404).send('Product not found');

            // Add additional images dynamically
            product.additionalImages = [
                product.Image2, product.Image3, product.Image4,
                product.Image5, product.Image6, product.Image7,
                product.Image8, product.Image9,
            ].filter(img => img); // Exclude undefined or null images

            // Fetch related products (e.g., from the same category)
            const relatedProducts = await user_db.find_products_detail({ category: product.Category }, '', 1, 4);

            // Fetch category name
            const category = await user_db.find_category_by_id(product.Category);
            product.categoryName = category.CatName;

            res.render('layouts/product_details', { 
                product, 
                relatedProducts 
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = ProductController;
