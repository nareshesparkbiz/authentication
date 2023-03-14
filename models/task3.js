
const util = require("util");
const { promisify } = require("util");
const mysql = require('mysql2');







module.exports = async function (req, res, app, con1) {


    var datat = [];
    var count_data;
var sql2 = 'select count(*) as count from `student_express_gor`';
con1.query(sql2, function (err, result1) {
    if (err) throw err;
    else {
        count_data = Math.ceil(result1[0]['count'] / 100);


    }


});
    
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            var a = req.query.id;
            if (a == 0) {
                return false;
            }
            else {
                var k = (a - 1) * 100 || 0;

            }
            var sql1 = `SELECT * FROM student_express_gor limit ${k},100`;



            con1.query(sql1, (err, result) => {
                if (err) console.log(err);
                else {


                    datat = (result);

                    var qc = count_data;

                    var user = datat.length;

                    res.render('task3', { data: datat, qc });

                }


            });

        }



}