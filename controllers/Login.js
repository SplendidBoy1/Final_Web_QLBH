const bcrypt = require('bcrypt')

// const passport = require('passport')

// const users = require('../models/db.js');
const db= require('../models/db.js')('public');
// import db_md from '../models/db.js'



const df = {
    Login(req, res){
        //console.log(req.body)
        // console.log("!!!!!!!!!!!!!!!!!1111111111111111111111111")
        // console.log(req.session)
        res.render('layouts/login')
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
            const hassedPass = await bcrypt.hash(req.body.password, 10);
            const id = await db.count('Users')
            console.log(id)
            console.log(parseInt(id.count)+1)
            console.log(req.body.username)
            //console.log(Date.now().)
            const user = {
                ID: parseInt(id.count)+1,
                Username: 'user' + (parseInt(id.count)+1),
                Email: req.body.username,
                Password: hassedPass,
                Name: "Dat",
                Permission: 1,
                DOB: null
            }
            console.log(user)
            db.add('Users', user)
            console.log("qqqqqqq")
            res.redirect('/')
        }      
        catch{
            res.redirect('/register')
        }
    },
    Main_admin(req, res){
        if (req.isAuthenticated()){
            return res.render('layouts/main_admin')
        }
        return res.redirect('/login')
    }
}
module.exports = df