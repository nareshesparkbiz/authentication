

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

const port = 9002;


app.use(cookieParser())
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/css_tasks')));
app.use(express.static(path.join(__dirname + '/public/images')));
app.use(express.static(path.join(__dirname + '/public/js_files')));
app.use(express.static(path.join(__dirname + '/models')));
app.use(bod.json());
app.use(bod.urlencoded({ extended: false }))


app.set('view engine', 'ejs');
app.set("views", "./views");
var con1 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "STUDENT",
    port: 3306
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_application",
    port: 3306
});



var query = util.promisify(con.query).bind(con);


app.get("/register", (req, res) => {
    res.render('registration')
})


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





app.get("/login", (req, res) => {
    res.render("login");

    // linkings(req, res, 'login',app,con1,con)

})

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



app.get("/home", (req, res) => {
    const jwttoken = req.cookies.tokens;
    console.log(jwttoken)
    if (!jwttoken) {
        return res.send("User not register please register at <a href='/register'>Register</a>")
    }
    const tokendata = jwt.verify(jwttoken, "naresh");
    console.log(tokendata);

    res.render("home", { tokendata });
})

app.get("/logout", (req, res) => {
    res.clearCookie("tokens");

    res.redirect("/login")
})

app.get("/profile", (req, res) => {

    const tokens = req.cookies.tokens;

    if (!tokens) {
        return res.redirect("/logout")
    }

    else {
        const token_data = jwt.verify(tokens, "naresh");
        console.log(token_data);
        res.render("profile", { token_data })

    }

})

app.post("/profile_update", async (req, res) => {
    const tokens = req.cookies.tokens;
    if (!tokens) {
        return res.redirect("/logout")
    }
    else {
        const token_data = jwt.verify(tokens, "naresh");
        console.log(token_data.activationkey);

        var profile_name = req.body.username;
        var profile_email = req.body.email;

        // console.log(profile_data)
        await query(`update authentication.login_data set username='${profile_name}',email='${profile_email}'where activationkey='${token_data['activationkey']}'`)

        // popus.alert({
        //     content: 'Profile Update Succesfully'
        // });

        res.redirect("/login")
    }
})


module.exports=app;







