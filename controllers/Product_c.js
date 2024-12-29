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
    
            // Fetch the category name
            const category = await user_db.find_category_by_id(product.CatID);
            if (!category) {
                console.error(`Category not found for CatID: ${product.CatID}`);
                return res.status(404).send('Category not found');
            }
            product.categoryName = category.CatName;
    
            // Fetch related products
            const relatedProducts = await user_db.find_products_detail(
                { category: product.CatID }, '', 1, 4
            );
    
            res.render('layouts/product_details', {
                product,
                relatedProducts,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    async addToCart(req, res) {
        let id = req.params.id;
        id = parseInt(id);
        // console.log(id);

        // Add to session
        if (!req.session.cart) {
            req.session.cart = [];
        }

        const userEmail = req.session.passport.user;
        const user = await user_db.findEmail('Users', 'Email', userEmail);
        const userId = user.ID;
        
        let cartItem = req.session.cart.find(item => item.ID_User === userId && item.ProID === id);
        if (cartItem) {
            cartItem.Quantity++;
            const rs = await user_db.updateQuantityCart(id, userId, cartItem.Quantity);
            return res.send('Added to cart');
        }
        else {
            req.session.cart.push({
                ID_User: userId,
                ProID: id,
                Quantity: 1,
            });

            const rs = await user_db.addToCart(id, userId, 1);

            res.send('Added to cart');        
        }
    },

    async renderCart(req, res) {
        if (!req.isAuthenticated()){
            return res.redirect('/login')
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        const userEmail = req.session.passport.user;
        const user = await user_db.findEmail('Users', 'Email', userEmail);
        const userId = user.ID;

        let cartItems = req.session.cart.filter(item => item.ID_User === userId);

        // console.log(cartItems);

        try {
            const products = [];
            for (let i = 0; i < cartItems.length; i++) {
                const product = await user_db.find_product_by_id(cartItems[i].ProID);
                if (product) {
                    product.Quantity = cartItems[i].Quantity;
                    product.TotalPrice = product.Price * product.Quantity;
                    products.push(product);
                }
            }

            // console.log(products);

            res.render('layouts/cart', { products });
        } 
        
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = ProductController;
