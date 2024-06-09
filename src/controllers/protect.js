

const AuthLogin = ( req , res , next ) => {
        if (req.session.login == true) {
            return next();
        }
} 


const AuthPublic = ( req , res , next ) => {
    if (req.session.login == false) {
        return next()
    }

    return res.redirect('/admin')
}


module.exports = {
    AuthLogin , 
    AuthPublic
}