const dotenv          = require("dotenv")
dotenv.config()
  
  const express       = require('express');
  const bodyParser    = require('body-parser');
  const session       = require("express-session")
  const config        = require('./config.json');
  const app           = express();



  const routeUser  = require("./src/routes/UserControlers.js")
  const {ViewController} = require("./src/controllers/viewsControlers.js")

  const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
};


  app.set("view engine", 'ejs')
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(session({
    secret: 'sjdkdsodjskdsfhiehri#$#%#wwiejwiej', 
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 300000}
    
}));
  
  


  
  app.get('/' , ViewController.homePage )
  app.get('/login' ,  ViewController.LoginPage)
  app.get('/register'  , ViewController.RegisterPage)
  app.get('/admin' , isAuthenticated ,ViewController.AdminPage, ( req , res ) => {
    res.json({
      status : 200,
      message : "oke"
    })
  })


  app.use('/' ,  routeUser )



  const port = config.port || 3000;
  app.listen(port);
  console.log(`Started app on port ${port}`);

