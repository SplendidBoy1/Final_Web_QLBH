const bcrypt = require('bcrypt')

const df = {
    Login(req, res){
        //console.log(req.body)
        // console.log("!!!!!!!!!!!!!!!!!1111111111111111111111111")
        // console.log(req.session)
        res.render('layouts/login')
    }
}
module.exports = df