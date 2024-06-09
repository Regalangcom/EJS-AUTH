const {databaseCon} = require("../database/connection.js")

const bcrypt      = require("bcrypt")


const RegisterUser = async ( req , res ) => {

    const { name, username , password  } = req.body



    if (!name || !username || !password) {
        return res.status(400).json({
            status : "failed",
            message : "harap di isi  pak !"
        })
    }




    try {
        const hashedPassword = await bcrypt.hash(password , 10)


        const Query = `INSERT INTO Auth_Demo (name , username , password ) VALUES (? , ? , ?)`;
        const value = [name , username , hashedPassword]




        databaseCon.query( Query , value, (err , result) => {
                if (err) {
                    console.log("error saat insert data");
                    console.log(result);
                    return res.status(500).json({
                        status: "failed",
                        message : "Terjadi kesalahan dalam membuat akun pak!"
                    })
                }

                console.log("User success created akun pak!");
                res.redirect("/login")

        })

    } catch (error) {
            console.log("error saat membut akun nih pak!" , error);        
            res.json({
                status : 500,
                message : "internal server error pak!"
            })
    }


}





const UserLogin = async (req, res) => {


    const { username, password } = req.body;

const query = `SELECT * FROM Auth_Demo WHERE username = ?`;
const values = [username];

try {
    databaseCon.query(query, values, async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.render('login', { error: "User not found" });
        }

        const user = result[0];

        if (!user.password) {
            return res.status(500).json({ message: "User record is missing password" });
        }

        const verifyUser = await bcrypt.compare(password, user.password);

        if (verifyUser) {
            return res.render('admin');
        } else {
            return res.render('login', { error: "Invalid username or password" });
        }
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
}



};

const LogOutUser = (req , res ) => {
    req.session.destroy((err) => {
        if (err) return console.log(err);

        res.redirect('/login')
    })
}







module.exports = {
    RegisterUser,
    UserLogin,
    LogOutUser
}