const bcrypt = require('bcrypt')

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
}
module.exports = df