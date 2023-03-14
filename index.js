
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
const linkings = require('./models/linkings')
const port = 9002;

const auth = require('./models/auth')




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


app.use(auth)




// ---------------------------tasks----------------------------------------------
app.get("/tasklist", (req, res) => {
    const tokens = req.cookies.tokens;
    if (!tokens) {
        return res.redirect("/logout")
    }
    else {

        res.render("tasklist");
    }
})


// ------------------------------task1 hello world----------------------------------------------
app.get('/hello_world', (req, res) => {
    const tokens = req.cookies.tokens;
    if (!tokens) {
        return res.redirect("/logout")
    }
    else {
        linkings(req, res, 'HELLO')
    }
 
});

app.get('/maintask2', async (req, res) => {

        linkings(req, res, 'TASK2',app,con1,con)
   


       
})

// --------------------------------------------------task3 node table data_result----------------------


app.get('/maintask3',(req,res)=>{
    linkings(req,res,'TASK3',app,con1)
})


// ---------------------------------------------task4 node---------------------------------
app.get('/maintask4', (req, res) => {
    linkings(req, res,'TASK4', app, con1)
})



// ----------------------------------------task5 node -------------------------------------
app.get('/task5', (req, res) => {
    linkings(req, res,'TASK5', app, con1)
})

// ----------------------------------------task6 node----------------------------------------

app.get('/task6', (req, res) => {
    linkings(req, res,'TASK6', app, con1)
})

// --------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log("port is listening")
});
