require('dotenv').config();


const cookieParser = require('cookie-parser');
const session = require('express-session')
const express = require('express')
const path= require('path')
const hbs = require('express-hbs')
const passport = require('passport')
const url = require('url')
const Payment = require('./routes/Payment_route.js')
const initializeSystem = require('./middleware/Initialize_PaymentSystem.js')
// const initializePassport = require('./middleware/Autheticate.js')
// const bodyParser = require('body-parser');
const bodyParser = require('body-parser')

const https = require('https')
const flash = require('connect-flash')
const fs = require('fs')

console.log(__dirname)

const key = fs.readFileSync('./sslcert/key.pem');
const cert = fs.readFileSync('./sslcert/cert.pem');

const options = {
    key: key,
    cert: cert
}



// console.log(options)

const app = express();

const port = process.env.PAYMENTPORT || 4000

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'publics')))

app.use(
  session({
    secret: '21127239', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false },
  })
);

app.use(flash());

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs')

app.set('views', './views')

initializeSystem();

app.use(Payment);


const auth_server = https.createServer(options, app);

app.all('*', (req, res) => {
    
    res.status(404).send('<h1>404! Page not found</h1>');
});

// app.listen(port, () => console.log(`Exmaple listening ${port}`))

auth_server.listen(port, () => console.log(`Exmaple listening ${port}`))

//client.connect();

// app.get('/users', (req, res) => {
//     console.log("asdfasdfasdfsdf")
//     client.query("Select * from users", (err, result) => {
//         if (!err){
//             console.log("asdfasdfasdfsdf")
//             res.send(result.rows);
//         }
        
//     })
//     client.end;
// })
// client.connect();

