//const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models/user_db.js')('public')


function initialize(passport){
    console.log("asdfasdfqqqqqq")
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
            return done(null, false, {message: 'User\'s email have not found'})
        }
        try {
            if (await bcrypt.compare(password, user.Password)){
                //console.log("True pass")
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
    console.log('qq')
    const strategy = new LocalStrategy(authenticateUser)
    // console.log(strategy)
    passport.use(strategy)
    passport.serializeUser((user, done) => {
        console.log('seri')
        console.log(user)
        done(null, user.Email)})
    console.log('qq')
    passport.deserializeUser((email, done) => {
        console.log('seriaa')
        console.log(email)
        const user_copy = db.findEmail('Users', 'Email', email)
        done(null, user_copy);})
    console.log('qq')
}


module.exports = initialize