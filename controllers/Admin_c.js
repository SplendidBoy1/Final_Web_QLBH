const bcrypt = require('bcrypt');

// const passport = require('passport')

// const users = require('../models/db.js');
const scheme = process.env.DBSCHEMA

const user_db = require('../models/user_db.js')(scheme);

const df = {
    async Update_user(req, res){
        try{
            // console.log("Update user")
            // console.log("Bodyyy")
            // console.log(req.body)
            // console.log(req.body.email)
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
            // console.log(req.body)
            const exist_user = await user_db.search_string_users('Users', 'Email', req.body.search_email)
            // console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_user !== undefined) {
                // console.log("QQQQExs")
                // console.log(exist_user)
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
            // console.log("WTF")
            res.redirect('/admin')
        }
    },
    async Delete_email(req, res){
        try{
            // console.log(req.body)
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
            // console.log("BODYYYYYYYYY")
            // console.log(req.body)
            // console.log(req.body.email)
            const exist_user = await user_db.findEmail('Users', 'Email', req.body.email)
            // console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_user !== undefined) {
                console.log("The email is already existed in the database!")
                res.json({flag: false}) 
                return 
            }
            const hassedPass = await bcrypt.hash(req.body.password, 10);
            const id = await user_db.highest_id("Users", "ID")
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
    },
    async Update_Cat(req, res){
        try{
            const rs = user_db.update_Cat("Categories", req.body)
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
            res.json({flag: false})
            res.redirect('/admin')
        }
    },
    async Search_Cat(req, res){
        try{
            // console.log(req.body)
            const exist_cat = await user_db.search_name_cat("Categories", "CatName", req.body.search_cat)
            // console.log(exist_cat)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_cat !== undefined) {
                // console.log("QQQQExs")
                // console.log(exist_user)
                res.json(exist_cat)
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
    async Add_Cat(req, res){
        try{
            // console.log("BODYYYYYYYYY")
            // console.log(req.body)
            // console.log(req.body.email)
            const exist_cat = await user_db.findEmail('Categories', 'CatName', req.body.catname)
            console.log(exist_cat)
            console.log("IDDDD")
            console.log("zzz")
            if (exist_cat !== undefined) {
                console.log("The category is already existed in the database!")
                res.json({flag: false}) 
                return 
            }
            // const hassedPass = await bcrypt.hash(req.body.password, 10);
            const id = await user_db.highest_id("Categories", "CatID")
            console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            const cat = {
                CatID: parseInt(id.CatID)+1,
                CatName: req.body.catname,
            }
            //console.log(user)
            user_db.add('Categories', cat)
            //console.log("qqqqqqq")
            res.json({flag: true})
            return
        }      
        catch{
            res.redirect('/admin')
        }
    },
    async Delete_Cat(req, res){
        try{
            // console.log(req.body)
            // const hi = []
            const exist_pro = await user_db.findAll_with_where('Products', 'CatID', req.body.id)
            // console.log(exist_pro)
            const find_all_id = await user_db.findEmail('Categories', 'CatName', 'All')
            // console.log(find_all_id)
            for (let i = 0; i < exist_pro.length; i++){
                console.log("HIHIHIHIHI")
                console.log(exist_pro[i].ProID)
                // `UPDATE "${schema}"."${tbName}"
                // SET "ProName" = '${entity.name}', "FullDes" = '${entity.des}', "Image_Src" = '${entity.img}', "Price" = ${entity.price}, "CatID" = ${entity.catid}, "ID_User" = ${entity.userid}
                // WHERE "ProID" = ${entity.id};`)
                const new_pro = {
                    "id" : exist_pro[i].ProID,
                    "name" : exist_pro[i].ProName,
                    "des" : exist_pro[i].FullDes,
                    "img": exist_pro[i].Image_Src,
                    "price" : exist_pro[i].Price,
                    "catid": find_all_id.CatID,
                    "userid": exist_pro[i].ID_User
                }
                console.log(new_pro);
                console.log(req.body.id)
                const rs = await user_db.update_pro("Products", new_pro);
            }
            const rs = await user_db.delete("Categories", "CatID", req.body.id)
            res.json({flag : true})
            return
        }      
        catch{
            res.json({flag : false})
            return
        }
    },
    async Update_Pro(req, res){
        try{
            // console.log("Update user")
            // console.log("Bodyyy")
            // console.log(req.body)
            // console.log(exist_user)
            // console.log("IDDDD")
            // console.log("zzz")
            const rs = await user_db.update_pro("Products", req.body)
            // console.log(rs)
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
            // console.log("WTF")
            res.json({flag: false})
            // res.redirect('/admin')
        }
    },
    async Search_Pro(req, res){
        try{
            // console.log(req.body)
            const exist_pro = await user_db.search_pro("Products", "ProName", req.body.search_pro)
            // console.log(exist_pro)
            // console.log("IDDDD")
            // console.log("zzz")
            if (exist_pro !== undefined) {
                // console.log("QQQQExs")
                // console.log(exist_user)
                res.json(exist_pro)
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
        }      
        catch{
            res.status(404).send(new Error("Error"))
            res.redirect('/admin')
        }
    },
    async Add_Pro(req, res){
        // console.log("BODYYYYYYYYY")
        // console.log(req.body)
        try{
            // console.log(req.file.filename)
            // console.log("BODYYYYYYYYY")
            // console.log(req.body)
            // console.log(req.file.filename)
            const id = await user_db.highest_id("Products", "ProID")
            console.log(id)
            const pro = {
                ProID: parseInt(id.ProID)+1,
                ProName: req.body.productname,
                FullDes: req.body.describe,
                Image_Src: req.file.filename,
                Price: parseInt(req.body.price),
                CatID: parseInt(req.body.catID),
                ID_User: parseInt(req.body.userID),
            }
            const rs = user_db.add('Products', pro)
            // console.log(rs)
            if(rs === '')throw 'Error'
            // console.log("qqqqqqq")
            
            req.session['success'] = true
            res.redirect('/admin')
            return
        }      
        catch{
            req.session['success'] = false
            res.redirect('/admin')
            // res.redirect('/admin')
            return
        }
    },
    async Delete_Pro(req, res){
        try{
            // console.log(req.body)
            const rs = await user_db.delete("Products", "ProID", req.body.id)
            res.json({flag : true})
            return
        }      
        catch{
            res.json({flag : false})
            return
        }
    }
}
module.exports = df