const bcrypt = require('bcrypt');

// const passport = require('passport')

// const users = require('../models/db.js');
const scheme = process.env.DBSCHEMA

// const user_db = require('../models/user_db.js')(scheme);
const category_db = require('../models/categoires_db.js');
const product_db = require('../models/product_db.js');


const df = {
    Landing: async (req, res) => {
        console.log("HEHEHEHE")
        const categories = await category_db.all();        
        const top30Rating = await product_db.top30Rating();
        console.log(categories)
        console.log(top30Rating)
        return res.render('layouts/landing', {categories: categories, products: top30Rating});
    }
}
module.exports = df