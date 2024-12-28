//const { authenticate } = require('passport')

const bcrypt = require('bcrypt')

const schema = process.env.DBSCHEMA

const db = require('../models/db.js')(schema)



async function initializeSystem(){
    // console.log("asdfasdfqqqqqq")
    const response = await db.any(`truncate "${schema}"."Payment"`);
    const account = {
        "AccountID": 1,
        "Account_Balance": 0
    }
    const rs = await db.add("Payment",account);
    console.log(rs)
}


module.exports = initializeSystem