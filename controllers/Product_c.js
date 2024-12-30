// In controllers/ProductController.js
// const { default: axios } = require('axios');
// const https = require('https');
const fs = require('fs')
const { param } = require('../routes/Login_route.js');
const product_db = require('../models/product_db.js');
const order_db = require('../models/order_db.js');

const axios = require('axios');
const https = require('https');

// const cert = fs.readFileSync('sslcert/cert.pem');

const agent = new https.Agent({
    rejectUnauthorized: false,
});
// const agent = new https.Agent({
//     rejectUnauthorized: false,
//   })

const user_db = require('../models/user_db.js')(process.env.DBSCHEMA);

const ProductController = {
    async renderProductPage(req, res) {
        if (!req.isAuthenticated()) return res.redirect('/login');
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
        if (!req.isAuthenticated()) return res.redirect('/login');
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
    async checkoutProducts(req, res){
        if (!req.isAuthenticated()) return res.redirect('/login');
        const id_products = req.body.products;
        const amounts = req.body.amounts;
        // console.log(id_products)
        // console.log(amounts)

        let total = 0;
        for (let i = 0; i < id_products.length; i++){
            console.log(id_products[i])
            const pro = await product_db.one("Products", "ProID", id_products[i])
            total +=  parseInt(pro.Price)*amounts[i]
        }
        console.log(total)
        const user = await req.user
        // console.log(user)
        try{
            const token = await axios.post('https://localhost:4000/paying_order',{id: user.ID, total:total}, { httpsAgent: agent})
            .then(response => {
                console.log(response.data);
                return response.data.accessToken
            })
            .catch(error => {
                //console.error(error);
                return error
            });
            const headers = { Authorization: `Bearer ${token}` };
            const data =  await axios.get('https://localhost:4000/account_balance',{ httpsAgent: agent, headers}
                ).then(response => {
                    // console.log(response.data);
                    return response.data
                }).catch (error => {
                    console.error('Error fetching account balance:', error.message);
                })
            // console.log(data)
            
            if (data.AccountID !== undefined){
                console.log("HIHI")
                
                var date = new Date(Date.now());
                var dd_mm_yyyy = date.toLocaleDateString();
                var yyyy_mm_dd = dd_mm_yyyy.replace(/(\d+)\/(\d+)\/(\d+)/g, "$3-$1-$2");
                // console.log(date.toLocaleTimeString())
                // console.log(yyyy_mm_dd)
                var time = date.toLocaleTimeString().replace(/AM|PM/,'') 
                //var mysqlTimestamp = Date.now().format('YYYY-MM-DD HH:mm:ss');

                console.log(yyyy_mm_dd)
                const highest_id = await order_db.find_highestID("Orders", "OrderID")
                console.log(highest_id)
                const id_order = highest_id + 1
                const new_order = {
                    "OrderID": id_order,
                    "OrderDate": yyyy_mm_dd + " " + time,
                    "ID_User": data.AccountID,
                    "Total": total
                }

                const rs = await order_db.add_order("Orders", new_order)

                for (let i = 0; i < id_products.length; i++){
                    console.log(id_products[i])
                    const pro = await product_db.one("Products", "ProID", id_products[i])
                    let total_each = parseInt(pro.Price)*amounts[i]
                    const high_id = await order_db.find_highestID("OrderDetails", "DetailID")
                    const new_detailorder = {
                        "DetailID": high_id + 1,
                        "OrderID": id_order,
                        "ProID": pro.ProID,
                        "Total_price": total_each,
                        "Amount": amounts[i]
                    }
                    const rsss = await order_db.add_order("OrderDetails", new_detailorder);
                }


            }
            return res.json({flag: true})


        }
        catch{
            return res.status(500).send({ error: "Error" });
        }

        // console.log(rs)
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
            const id_products = []
            const quantity = []
            for (let i = 0; i < products.length; i++){
                id_products.push(products[i].ProID)
                quantity.push(products[i].Quantity)
            }

            res.render('layouts/cart', { products, id_products, quantity});
        } 
        
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async deleteCart(req, res){
        const user = await req.user
        console.log(await req.user)
        console.log(req.session.cart)
        try{
            const rs = order_db.delete_cart_where("Cart", "ID_User", user.ID)
            req.session.cart = []
            return res.json({flag: true})
        }
        catch{
            return res.status(500).send('Internal Server Error');
        }
        
    }
};

module.exports = ProductController;
