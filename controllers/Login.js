const bcrypt = require('bcrypt');

// const passport = require('passport')

// const users = require('../models/db.js');
const scheme = process.env.DBSCHEMA

const db= require('../models/user_db.js')(scheme);
// import db_md from '../models/db.js'



const df = {
    Login(req, res){
        //console.log()
        //console.log(req.body)
        // console.log("!!!!!!!!!!!!!!!!!1111111111111111111111111")
        // console.log(req.session)
        // console.log("Remder qqq")
        // console.log(req.flash("error"))
        res.render('layouts/login', {message: req.flash("error")[0]})
    },
    Register(req, res){
        //console.log(req.body)
        //console.log("!!!!!!!!!!!!!!!!!1111111111111111111111111")
        
        res.render('layouts/register')
    },
    async Register_account(req, res){
        // console.log(req.body)
        //
        try{
            //console.log(req.body)
            const exist_user = await db.findEmail('Users', 'Email', req.body.email)
            // console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_user !== undefined) {
                console.log("The email is already existed in the database!")
                res.json({flag: false}) 
                return 
            }
            const hassedPass = await bcrypt.hash(req.body.password, 10);
            const id = await db.highest_id("Users", "ID")
            // console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            const user = {
                ID: parseInt(id.ID)+1,
                Username: req.body.username,
                Email: req.body.email,
                Password: hassedPass,
                Name: "Dat",
                Permission: 1,
            }
            //console.log(user)
            db.add('Users', user)
            //console.log("qqqqqqq")
            res.json({flag: true})
            return
        }      
        catch{
            res.redirect('/register')
        }
    },
    async Check_route(req, res){
        if (req.isAuthenticated()){
            const user = await req.user;
            // console.log(user)
            const role_join_user = await db.find_join("Users", "Role", "Role_ID", "ID", user.Role_ID)
            //console.log(role_join_user)
            if (role_join_user === undefined)return res.redirect('/login')
            if (role_join_user.Role_user === "Admin"){

                return res.redirect('/admin')
            }
            else {
                if (role_join_user.Role_user === "Customer")
                return res.redirect('/landing')
            }
            // return res.render('layouts/main_admin')
        }
        return res.redirect('/login')
    },
    Render_landing(req, res){
        if (!req.isAuthenticated())return res.redirect('/login')
        return res.render('layouts/landing')
    },
    async Render_admin(req, res){
        if (!req.isAuthenticated())return res.redirect('/login')
        //console.log("qqqqqqqqqqqqqqqqqqqqqqqqqq")
        const users = await db.find_all("Users", "ID", "ASC")
        //console.log(users)
        return res.render('layouts/main_admin', {users : {count : users.length, data: users}})
    },
    Logout(req, res){
        req.logout((err) => {
            if (err){return next(err)}
            res.redirect('/')
        })

    }
}
module.exports = df