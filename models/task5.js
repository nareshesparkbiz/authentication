

const util = require("util");
const { promisify } = require("util");
const mysql = require('mysql2');


module.exports=async function(req,res,app,con1){
var datat = [];
var count_data;

var limit = 100;
var f_name;
var l_name;
var contact;
var email;
var page_no;
var c_sort;
var order;
var a;


// count the no of rows in database and set page number 


var sql2 = 'select count(*) as count from `student_express`';
con1.query(sql2, function (err, result1) {
    if (err) throw err;
    else {
        count_data = Math.ceil(result1[0]['count'] / limit);

        // console.log(count_data);
    }


});





// Select the data in limit of 100 and show in the form of table in response 






    const tokens = req.cookies.tokens;
    if (!tokens) {
        return res.redirect("/logout")
    }
    else {
        c_sort = req.query.sort;
        order = req.query.order;

        console.log(c_sort);
        a = req.query.id;

        var sql1;
        var k;


        if (req.query.id == '') {
            req.query.id = 1;
        }
        if (req.query.id != '') {
            k = (req.query.id - 1) * limit || 0;

            if (req.query.sort == '') {
                req.query.sort = 'sid';


                if (req.query.order == '') {
                    order = 'asc';
                    sql1 = `SELECT * FROM student_express order by ${req.query.sort} ${order} limit ${k},${limit}`;
                }
                // if (c_sort != '') {
                //     c_sort = req.query.sort;
                if (req.query.order != '') {
                    order = req.query.order;
                    sql1 = `SELECT * FROM student_express order by ${req.query.sort} ${order} limit ${k},${limit}`;
                }
            }
            if (req.query.sort != '') {
                req.query.sort = req.query.sort;

                if (req.query.order == '') {
                    order = 'asc';
                    sql1 = `SELECT * FROM student_express order by ${req.query.sort} ${order} limit ${k},${limit}`;
                }
                // if (c_sort != '') {
                //     c_sort = req.query.sort;
                if (req.query.order != '') {
                    order = req.query.order;
                    sql1 = `SELECT * FROM student_express order by ${req.query.sort} ${order} limit ${k},${limit}`;
                }
            }


            con1.query(sql1, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {

                    page_no = count_data;
                    datat = (result);

                    res.render('task5', { data: datat, page_no, c_sort, order, a });
                }


            });



        }
    }



app.get("/search", function (req, res) {
    const tokens = req.cookies.tokens;
    if (!tokens) {
        return res.redirect("/logout")
    }
    else {

        f_name = req.query.fname;
        console.log(f_name);
        l_name = req.query.lname;
        console.log(l_name);

        email = req.query.email;
        console.log(email);
        contact = req.query.contact;
        console.log(contact);


        var sql3 = `select * from student_express where first_name like '%${f_name}%' AND last_name like '%${l_name}%' AND contact like '%${contact}%' AND email like '%${email}%'`;


        con1.query(sql3, function (error, result2) {
            if (error) {
                console.log(error);
            }
            else {
                var search_data = (result2);

                res.render("task5", { data: search_data, page_no, c_sort, order, a });
            }
        });
    }

});

}
