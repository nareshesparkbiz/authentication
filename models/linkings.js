
const util = require('util')

const path = require('path')


const jwt = require("jsonwebtoken")


const hello = require('./hello_world')
const task4=require('./task4')
const task2 = require('./node_task')
const task3 = require('./task3')
const task5 = require('./task5')
const task6 = require('./task6')
const register = require('./registration')
const login = require('./login')









module.exports = async function (req, res, option,app, con1,con) {
     
    if(option=='register'){
        var data= await register(req,res,con,app);
    }

    if(option=='login'){
        var data= await login(req,res,con,app);
    

    const jwttoken = req.cookies.tokens;
    console.log(jwttoken)
    if (!jwttoken) {
        return res.send("User not register please register at <a href='/register'>Register</a>")
    }
    else {
        try {
            const tokendata = jwt.verify(jwttoken, "naresh");

            // Hello World :-
            if (option == 'HELLO') {
                var data = await hello();

                console.log(data);
                res.render('hello', data);
            }

            if(option == 'TASK2'){
                var task21 = await task2(req,res,app,con)
            }

            if(option=='TASK3'){
                var task31= await task3(req,res,app,con1)
            }


            // Node task :-
            if (option == 'TASK4') {
                var data = await task4(req,res,app,con1);


                // res.render('hello', data);
            }

            if(option=='TASK5'){
                var data=await task5(req,res,app,con1);
            }

            if(option=='TASK6'){
                var data=await task6(req,res,app,con);
            }
        
        
        
        }
        catch {
            res.redirect('/logout');
        }

    }
}

}