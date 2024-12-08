//const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models/user_db.js')('public')


function initialize(passport){
    console.log("asdfasdf")
    // console.log(passport)
    // console.log(getUserByEmail)
    const authenticateUser =  async (email, password, done) => {
        // console.log("asdfasdf")
        console.log(email)
        //console.log("asdfasdf")
        console.log(password)
        const user = await db.findEmail('Users', 'Email', email)
        console.log(user)
        if (user === undefined){
            return done(null, false, {message: 'No user'})
        }
        try {
            if (await bcrypt.compare(password, user.Password)){
                console.log("True pass")
                return done(null, user)
            }
            else {
                return done(null, false, {message: "Wrong password"})
            }
        }
        catch(e){
            return done(e);
        }
    }
    //authenticateUSer()
    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user, done) => {done(null, user.Username)})
    passport.deserializeUser((user, done) => {
        const user_copy = db.findEmail('Users', 'Email', user)
        done(null, user_copy);})
}


module.exports = initialize