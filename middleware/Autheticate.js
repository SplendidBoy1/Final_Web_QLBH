//const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models/user_db.js')('public')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


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
    const local_strategy = new LocalStrategy(authenticateUser)
    const google_strategy = new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:21239/oauth2callback_google",
        scope: ['profile', 'email']
      },
      async function(accessToken, refreshToken, profile, done) {
        console.log("access")
        console.log(accessToken)
        console.log("refress")
        console.log(refreshToken)
        console.log("pro")
        console.log(profile)
        console.log(profile.emails[0].value)
        const user = await db.findEmail('Users', 'Email', profile.emails[0].value)
        console.log("USERRR")
        console.log(user)
        if (user === undefined){
            const hassedPass = await bcrypt.hash(profile.id, 10);
            const id = await db.highest_id("Users", "ID")
            // console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            const new_user = {
                ID: parseInt(id.ID)+1,
                Username: profile.displayName,
                Email: profile.emails[0].value,
                Password: hassedPass,
                Name: "Dat",
                Permission: 1,
            }
            //console.log(user)
            db.add('Users', new_user)
            return done(null, new_user)
        }
        try {
            console.log("qqq")
            return done(null, user)
        }
        catch(e){
            return done(e);
        }
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
    // console.log(strategy)
    const facebook_strategy = new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:21239/oauth2callback_facebook",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      async function(accessToken, refreshToken, profile, done) {
        console.log("access")
        console.log(accessToken)
        console.log("refress")
        console.log(refreshToken)
        console.log("pro")
        console.log(profile)
        console.log(profile.emails[0].value)
        const user = await db.findEmail('Users', 'Email', profile.emails[0].value)
        console.log("USERRR")
        console.log(user)
        if (user === undefined){
            const hassedPass = await bcrypt.hash(profile.id, 10);
            const id = await db.highest_id("Users", "ID")
            // console.log(id)
            // console.log(parseInt(id.count)+1)
            // console.log("resss")
            // console.log(req.body)
            //console.log(Date.now().)
            const new_user = {
                ID: parseInt(id.ID)+1,
                Username: profile.displayName,
                Email: profile.emails[0].value,
                Password: hassedPass,
                Name: "Dat",
                Permission: 1,
            }
            //console.log(user)
            db.add('Users', new_user)
            return done(null, new_user)
        }
        try {
            console.log("qqq")
            return done(null, user)
        }
        catch(e){
            return done(e);
        }
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    );
    passport.use(local_strategy)
    passport.use(google_strategy)
    passport.use(facebook_strategy)
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