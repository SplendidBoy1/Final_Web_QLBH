const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
// const passport = require('passport')

const db_pay = require('../models/payment_db.js');
const scheme = process.env.DBSCHEMA
// import db_md from '../models/db.js'

// data = [
//     {
//         id: 1,
//         total: 100 
//     }
// ]

const df = {
    async Paying(req, res){
        // console.log("REQQQQQ")
        // console.log(req.body)
        const iduser = req.body.id;
        const total = req.body.total;
        const user = {id: iduser, total: total};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken});
    },
    authenticateToken(req, res, next){
        // console.log(req.headers)
        const authHeader = req.headers['authorization']
        // console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1]
        // console.log(token)
        // console.log("hihi")
        if (token == null)return res.sendStatus(401);
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        })
    },
    async Take_account(req, res){
        const data = await db_pay.find_all("Payment")
        // console.log(data)
        data.forEach(async da => {
            const user = await req.user;
            if (da.AccountID === user.id){
                const user_admin = await db_pay.find_acc("Payment", "AccountID", 1)
                let balance_admin = parseInt(user_admin.Account_Balance) + user.total
                let balance_cus = parseInt(da.Account_Balance) - user.total
                await db_pay.update_balance("Payment", 1, balance_admin);
                await db_pay.update_balance("Payment", da.AccountID, balance_cus);
                const highest_id = await db_pay.find_idhighest("Payment History", "ID")
                var date = new Date(Date.now());
                var dd_mm_yyyy = date.toLocaleDateString();
                var yyyy_mm_dd = dd_mm_yyyy.replace(/(\d+)\/(\d+)\/(\d+)/g, "$3-$1-$2");
                // console.log(date.toLocaleTimeString())
                // console.log(yyyy_mm_dd)
                var time = date.toLocaleTimeString().replace(/AM|PM/,'') 
                const history = {
                    "ID": highest_id + 1,
                    "AccountID": da.AccountID,
                    "Send_total": user.total,
                    "PaymentDate": yyyy_mm_dd + " " + time
                }
                await db_pay.add_account("Payment History", history);

                da.Account_Balance = balance_cus
                // console.log(da)
                res.json(da)
            }
        })
        // res.json(data.filter(async (da) => {
        //     // console.log(da)
        //     // console.log(req.user)
        //     }))
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