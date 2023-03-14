


const express = require('express');
const app = express();
const util = require('util')
const bod = require('body-parser');
const path = require('path')
const { promisify } = require("util");
const mysql = require('mysql2');
const { count } = require('console');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")



module.exports=async function(req,res,con,app){
  var query = util.promisify(con.query).bind(con);  

res.render('registration')
app.get("/email", async (req, res) => {
    var email = req.query.email;
    // console.log(email)
    var sql1 = await query(`select email from authentication.login_data where email='${email}'`)

    // console.log(sql1)
    if (sql1.length != 0) {
        var result = sql1[0]['email'];

        res.json(result)
    }
    else {
        res.json("NOT")
    }



})

app.post("/register", async (req, res) => {
    let username = req.body.name;
    let email1 = req.body.email
    let password = req.body.pasw

    const encryptpass = await bcrypt.hash(password, 10);
    // console.log(encryptpass)



    var act = Math.random().toString(36).substring(2, 7);
    var link = `localhost:9002/activate?token=${act}`
    var sql = await query(`insert into authentication.login_data(username,email,password,activationkey,isactivated) values('${username}','${email1}','${encryptpass}','${link}',0)`);
    res.render("link", { link })

})

app.get("/activate", async (req, res) => {
    const key = req.query.linkdata;
    // console.log(key)


    var sql1 = await query(`select activationkey from authentication.login_data where activationkey='${key}'`)
    console.log(sql1)
    if (sql1[0]['activationkey'] === key) {
        await query(`update authentication.login_data set isactivated=1 where activationkey='${key}'`);
        res.render("activated")
    }
    else {

        res.send("Invalid link")
    }



})

}