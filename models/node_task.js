

const util = require("util");
const { promisify } = require("util");
const mysql = require('mysql2');





// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "job_application",
//     port: 3306
// });



module.exports = async function (req, res, app, con) {


    var arr = [];
    var namedata;

    var query = util.promisify(con.query).bind(con);
    var sql3 = `select select_name from select_master2`;

    var result = await query(sql3);
    namedata = result;

    // con.query(sql3, (err, result) => {

    //     if (err) throw err;
    //     namedata = result;
    // });

    var str = ""

    async function combo_generation(namedata) {

        var alldata = {};
        console.log(namedata)
        for (let i = 0; i < namedata.length; i++) {
            var str = "";
            var sql = `select id from select_master2 where select_name='${namedata[i]['select_name']}'`;

            var select_id = await query(sql);
            //console.log(select_id[0].id);

            var sql1 = `select category,option_value from select_master2,option_master2 where select_master2.id=option_master2.select_id and select_master2.id=${select_id[0]['id']}`;
            console.log(sql1)
            let data = await query(sql1);
            // console.log(data[0].category)
            if (data[0].category == 'combo') {
                for (let i = 0; i < data.length; i++) {
                    str += `<option value=${data[i].option_value}>${data[i].option_value}</option>`

                    // alldata[namedata[i]['select_name']]=str
                    // console.log( alldata[namedata[i]['select_name']])

                }
                //  alldata.push(str)
            }
            if (data[0].category == 'checkbox') {

                for (let i = 0; i < data.length; i++) {
                    str += `<label>${data[i].option_value}</label><input type="checkbox"  name='check'/>`

                    // alldata[namedata[i]['select_name']]=str
                    // console.log( alldata[namedata[i]['select_name']])

                }


                // console.log( alldata[namedata[i]['select_name']])

            }
            // alldata.push(str)
            alldata[namedata[i]['select_name']] = str
            console.log(alldata[namedata[i]['select_name']])
            // console.log(data);
        } return alldata;
    }



    var resultdata = []
    //console.log(select_id);


    resultdata = await combo_generation(namedata);





    res.render("demo", { resultdata })

}


