const bcrypt = require('bcrypt');
const user_db = require('../models/user_db.js');

const db= require('../models/user_db.js')('public');

const df = {
    Login_Page(req, res){
        //console.log(req.body)
        // console.log("!!!!!!!!!!!!!!!!!1111111111111111111111111")
        // console.log(req.session)
        res.render('layouts/login')
    },
    Register_Page(req, res){
        //console.log(req.body)
        // console.log("!!!!!!!!!!!!!!!!!1111111111111111111111111")
        // console.log(req.session)
        res.render('layouts/register')
    },
    async Register_User(req, res){
        // console.log(req.body);
        try{
            const exist_user = await db.findEmail('Users', 'Email', req.body.email)
            console.log(exist_user)
            if (exist_user.ID === !undefined) {
                console.log("The email is already existed in the database!")
                res.json({flag: false}) 
                return 
            } 
            console.log("qqqqqq")
            console.log(req.body)
            const hassedPass = await bcrypt.hash(req.body.password, 10);
            // console.log("qqqqqq")
            const id = await db.highest_id("Users", "ID")
            // console.log(id)
            // console.log(parseInt(id.ID)+1)
            // console.log(req.body.username)
            //console.log(Date.now().)
            const user = {
                ID: parseInt(id.ID)+1,
                Username: req.body.username,
                Email: req.body.email,
                Password: hassedPass,
                Name: "Dat",
                Permission: 1
            }
            console.log(user)
            db.add('Users', user)
            console.log("qqqqqqq")
            res.json({flag: true})
            return
        }      
        catch{
            res.redirect('/register')
        }
    }
}
module.exports = df