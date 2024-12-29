//const { authenticate } = require('passport')
const axios = require('axios');
const https = require('https');

// const cert = fs.readFileSync('sslcert/cert.pem');

const agent = new https.Agent({
    rejectUnauthorized: false,
});
const bcrypt = require('bcrypt')

const schema = process.env.DBSCHEMA

const db = require('../models/db.js')(schema)



async function registerToSystem(){
    // console.log("asdfasdfqqqqqq")
    const users = await db.all("Users");
    // console.log(users)
    users.forEach( async function(user) {
        // console.log(user)
        const rs = await axios.post('https://localhost:4000/register_account',{id: user.ID}, { httpsAgent: agent})
            .then(response => {
                // console.log(response.data);
                return response.data.flag
            })
            .catch(error => {
                //console.error(error);
                return error
            })
        // console.log(rs)
        if (rs == true){
            console.log("Register success");
        }
        else{
            console.log("Account has existed");
        }
    })
    // const account = {
    //     "AccountID": 1,
    //     "Account_Balance": 0
    // }
    // const rs = await db.add("Payment",account);
    // console.log(rs)
}


module.exports = registerToSystem