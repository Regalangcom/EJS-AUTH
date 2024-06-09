const ViewController = {
    // merender file home.ejs
    homePage : (req , res ) => {
        res.render('home')
    },

    
    // merender file login.ejs
    LoginPage : (req , res ) => {
        res.render('login')
    },

    // merender file register.ejs
    RegisterPage : (req , res ) => {
        res.render('register')
    },
    // merender file admin.ejs
    AdminPage : (req , res ) => {
        res.render('admin')
    }
}

module.exports = {ViewController}