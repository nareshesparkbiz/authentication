
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
    app.use(express.static(path.join(__dirname + '/public/images')));
    res.render("login");
    app.post("/login", async (req, res) => {

        // console.log(req.body)
        const { email, pasw } = req.body;
        // console.log(email)
        // console.log(pasw)
    
        var verifyuser = await query(`select * from authentication.login_data where email='${email}'`)
        // console.log(verifyuser)
        if (verifyuser.length == 0) {
            return res.send("User not register please register at <a href='/register'>Register</a>")
        }
    
        else {
    
            var userpass = verifyuser[0]['password'];
            var match = await bcrypt.compare(pasw, userpass);
    
            if (match) {
    
                var check_activate = verifyuser[0]['isactivated'];
                if (check_activate == null || check_activate == 0) {
                    return res.render("update", { email })
                }
                else {
                    console.log(verifyuser)
                    //generating jwt token
                    const tokens = jwt.sign(verifyuser[0], "naresh");
                    res.cookie("tokens", tokens);
    
                    res.redirect("/home");
                }
    
            }
    
            //    else{
    
            //         return res.json("not matched")
            //     }
        }
    
    
    })
    
    app.get("/password", async (req, res) => {
        var check = req.query.check;
        console.log(check)
        var emailed = req.query.email;
        console.log(emailed)
    
        console.log(check);
        var verifyuserd = await query(`select * from authentication.login_data where email='${emailed}'`)
        console.log(verifyuserd)
        var userpassed = verifyuserd[0]['password'];
        console.log(userpassed)
        var matched = await bcrypt.compare(check, userpassed);
        // console.log(matched)
        if (matched) {
            console.log("kkkk")
            res.json("true")
        }
        else {
            console.log("kkkkggggggg")
    
            res.json("false")
        }
    
    })
    
    app.get("/forgot_pass", (req, res) => {
        res.render("forgot_pass");
    })
    
    app.post("/forgot_pass", async (req, res) => {
        var email1 = req.body.email;
        let new_pass = req.body.newpas;
        const encryptpassword = await bcrypt.hash(new_pass, 10);
    
    
    
        var result1 = await query(`update  authentication.login_data set password='${encryptpassword}' where email='${email1}' `)
        console.log(result1);
    
        res.redirect("/login");
    })
    app.get("/check_pass", async (req, res) => {
        let uname = req.query.uname;
        let email = req.query.email;
    
        console.log(uname);
        console.log(email);
    
        var sql = await query(`select username,email from authentication.login_data where email='${email}'AND username='${uname}' `)
        console.log(sql)
        if (sql.length != 0) {
            res.json("true")
        }
        else {
            res.json("false");
        }
    
    })
    
    app.get("/update", async (req, res) => {
        var user_email = req.query.email1;
        console.log(user_email);
    
        var sql3 = await query(`update  authentication.login_data set isactivated=1 where email='${user_email}'`)
        res.render("activated")
    
    
    });


}