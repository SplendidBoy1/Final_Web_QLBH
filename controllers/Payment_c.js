const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
// const passport = require('passport')

const db_pay = require('../models/payment_db.js');
const scheme = process.env.DBSCHEMA
// import db_md from '../models/db.js'

data = [
    {
        id: 1,
        total: 100 
    }
]

const df = {
    async Paying(req, res){
        console.log("REQQQQQ")
        // console.log(req.body)
        const iduser = req.body.id;
        const total = req.body.total;
        const user = {id: iduser, total: total};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken});
    },
    authenticateToken(req, res, next){
        console.log(req.headers)
        const authHeader = req.headers['authorization']
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        console.log("hihi")
        if (token == null)return res.sendStatus(401);
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        })
    },
    Take_account(req, res){

        res.json(data.filter(da => da.id === req.user.id))
    },
    async Register_account(req, res){
        const id = req.body.id;
        // console.log(id)
        try{

            const check_exist = await db_pay.find_acc("Payment", "AccountID", id)
            // console.log("HAHAHA")
            // console.log(check_exist)
            if (check_exist !== undefined){
                return res.json({flag: false});
            }
            // console.log("HUHUHU")
            const new_acc = {
                "AccountID" : id,
                "Account_Balance": 0
            }

            const rs = await db_pay.add_account("Payment", new_acc);
            return res.json({flag: true});
        }
        catch{
            return res.json({flag: false});
        }
    }
}
module.exports = df