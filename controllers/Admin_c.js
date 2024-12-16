const bcrypt = require('bcrypt');

// const passport = require('passport')

// const users = require('../models/db.js');
const scheme = process.env.DBSCHEMA

const user_db = require('../models/user_db.js')(scheme);

const df = {
    async Update_user(req, res){
        try{
            console.log("Update user")
            console.log("Bodyyy")
            console.log(req.body)
            console.log(req.body.email)
            const exist_user = await user_db.findEmail('Users', 'Email', req.body.email)
            // console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_user !== undefined) {
                if (exist_user.ID === req.body.id){
                    const rs = user_db.update_User("Users", req.body)
                    res.json({flag: true})
                    return
                }
                else{
                    console.log("The email is already existed in the database!")
                    res.json({flag: false}) 
                    return 
                }
            }
            const rs = user_db.update_User("Users", req.body)
            // const hassedPass = await bcrypt.hash(req.body.password, 10);
            // const id = await db.highest_id("Users", "ID")
            // console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            // const user = {
            //     ID: parseInt(id.ID)+1,
            //     Username: req.body.username,
            //     Email: req.body.email,
            //     Password: hassedPass,
            //     Name: "Dat",
            //     Permission: 1,
            // }
            //console.log(user)
            // db.add('Users', user)
            //console.log("qqqqqqq")
            res.json({flag: true})
            return
        }      
        catch{
            console.log("WTF")
            res.redirect('/admin')
        }
    },
    async Search_email(req, res){
        try{
            console.log(req.body)
            const exist_user = await user_db.search_string_users('Users', 'Email', req.body.search_email)
            // console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_user !== undefined) {
                console.log("QQQQExs")
                console.log(exist_user)
                res.json(exist_user)
                return
            }
            else{
                res.status(404).send(new Error("Error"))
                return 
            }
            // const hassedPass = await bcrypt.hash(req.body.password, 10);
            // const id = await db.highest_id("Users", "ID")
            // console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            // const user = {
            //     ID: parseInt(id.ID)+1,
            //     Username: req.body.username,
            //     Email: req.body.email,
            //     Password: hassedPass,
            //     Name: "Dat",
            //     Permission: 1,
            // }
            //console.log(user)
            // db.add('Users', user)
            //console.log("qqqqqqq")
            // res.json({flag: true})
            return
        }      
        catch{
            console.log("WTF")
            res.redirect('/admin')
        }
    },
    async Delete_email(req, res){
        try{
            console.log(req.body)
            const rs = await user_db.delete("Users", "ID", req.body.id)
            res.json({flag : true})
            return
        }      
        catch{
            res.json({flag : false})
            return
        }
    },
    async Add_user(req, res){
        try{
            console.log("BODYYYYYYYYY")
            console.log(req.body)
            console.log(req.body.email)
            const exist_user = await user_db.findEmail('Users', 'Email', req.body.email)
            console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_user !== undefined) {
                console.log("The email is already existed in the database!")
                res.json({flag: false}) 
                return 
            }
            const hassedPass = await bcrypt.hash(req.body.password, 10);
            const id = await user_db.highest_id("Users", "ID")
            console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            const user = {
                ID: parseInt(id.ID)+1,
                Username: req.body.username,
                Email: req.body.email,
                Password: hassedPass,
                Name: req.body.name,
                Role_ID: req.body.role,
                Permission: req.body.permision,
            }
            //console.log(user)
            user_db.add('Users', user)
            //console.log("qqqqqqq")
            res.json({flag: true})
            return
        }      
        catch{
            res.redirect('/admin')
        }
    }
}
module.exports = df