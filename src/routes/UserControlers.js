const express = require('express');
const route  = express.Router()


const { RegisterUser , UserLogin , LogOutUser } = require("../controllers/UserControllers")
// const {AuthPublic} = require("../controllers/protect")
// const {} = require("../controllers/UserControllers")

// const isAuthenticated = (req, res, next) => {
//     if (req.session && req.session.login) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// };

  route.post('/login' ,   UserLogin)
  route.post('/register' ,  RegisterUser)
  route.get('/logout' , LogOutUser  )

module.exports = route

