const db = require("mysql2")


const databaseCon = db.createConnection({
    host: process.env.HOST_DB,
    user : process.env.USER_DB,
    password : process.env.USER_PASSWORD,
    database : process.env.USER_DATABASE
}) 


databaseCon.connect( function( err ) {
    if (err) {
        console.log("Error in connection pak!");
    } else {
        console.log("database connect pak!");
    }
 })


 module.exports = {databaseCon}