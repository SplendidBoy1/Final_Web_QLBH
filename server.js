require('dotenv').config();

const session = require('express-session')
const express = require('express')
const path= require('path')
const hbs = require('express-hbs')
const passport = require('passport')
const url = require('url')
const initializePassport = require('./middleware/Autheticate.js')
// const bodyParser = require('body-parser');
const bodyParser = require('body-parser')
const multer = require('multer');
const Login = require('./routes/Login_route.js')
const Admin = require('./routes/Admin_route.js')
const Landing = require('./routes/Landing_route.js');
const flash = require('connect-flash')

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



const app = express();
const port = process.env.PORT  || 21239


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//const db = require('./models/db')(process.env.DBSCHEMA);

//const router_1 = require('./routes/Home_route')

app.use(express.static(path.join(__dirname, 'publics')))

app.use(
    session({
      secret: '21127239', 
      resave: false, 
      saveUninitialized: true, 
      cookie: { maxAge: 1000*1000 },
    })
  );


app.use(flash());

// app.use(session({
//     secret: 'hellohello',
//     resave: false,
//     saveUninitialized: false
// }))

// async function getData(){
//     const data = await fetch("http://matuan.online:2422/api/Movies");
//     const rs =  await data.json();
//     rs.forEach(async (each_data) => {
//         console.log(each_data)
//         let data_gene = each_data.genreList
//         let genes = []
//         for (let index = 0; index < data_gene.length; index++){
//             genes.push(data_gene[index].key)
//         }

//         let movie = {
//             movie_id: each_data.id,
//             movie_name: each_data.title,
//             image_link: each_data.image,
//             releasedate: each_data.year,
//             plot: each_data.plot,
//             genes: genes.toString(),
//             rating: each_data.ratings.imDb
//         }
//         console.log(movie)
//         try {
//             const rs = await db.add("Movie", movie)
//         }
//         catch(e){
//             console.log(e)
//         }
//         // console.log(each_data.id)
//         // console.log(each_data.title)
//         // console.log(each_data.year)
//         // console.log(each_data.image)
//         // console.log(each_data.plot)
//     });
    
//     //console.log(data);
//     // console.log(rs)
// }

// getData();

hbs.registerHelper('diff_id', (a, b) => a !== b)

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));



app.set('view engine', 'hbs')

app.set('views', './views')


app.use(passport.initialize())
app.use(passport.session())

initializePassport(passport);

// console.log(initializePassport.name)



//app.use(router_1)

app.use(Login);
app.use(Admin);
app.use(Landing);
// app.route('/', (req, res) => {
//   //console.log("asdfasdf")
//   res.render('login')
// })

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
      req.session['success'] = false
      res.redirect('/admin')
      // res.redirect('/admin')
      return
  } else if (err) {
      req.session['success'] = false
      res.redirect('/admin')
      // res.redirect('/admin')
      return
  } else {
      next();
  }
});

app.all('*', (req, res) => {
  
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(port, () => console.log(`Exmaple listening ${port}`))

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

