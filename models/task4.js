
const util = require('util')

const mysql = require('mysql2');


// var con1= mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "stu",
//     port: 3306
// });


var datat = [];


module.exports = async function (req, res, app, con1) {


    const tokens = req.cookies.tokens;
    if (!tokens) {
        return res.redirect("/logout")
    }
    else {
        var sql1 = `SELECT * FROM student_express `;

        con1.query(sql1, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {

                datat = (result);

                res.render('task4', { data: datat, searched, count_record });
            }


        });
    }

    // console.log(datat[5]);




    // var f_name;
    var searched;
    var selected;
    var search_data;
    var count_record;


    app.get("/searchdata", function (req, res) {
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            searched = req.query.search;
            selected = req.query.select1;


            var fnamel = [];
            var fnamestr = "";

            var lnamel = [];
            var lnamestr = "";

            var cityl = [];
            var citystr = "";

            var contl = [];
            var cont1 = "";

            var colllist = [];
            var collstr = "";

            for (i = 0; i < searched.length; i++) {
                if (searched[i] == '^') {
                    fnamestr = "";
                    for (j = i + 1; j < searched.length; j++) {
                        if (searched[j] != '$' && searched[j] != '_' && searched[j] != '~' && searched[j] != "/" && searched[j] != "^") {
                            fnamestr += searched[j];
                        }
                        else {
                            break;
                        }


                    }
                    fnamel.push(fnamestr);
                }

                if (searched[i] == '$') {
                    lnamestr = "";
                    for (j = i + 1; j < searched.length; j++) {
                        if (searched[j] != '^' && searched[j] != '_' && searched[j] != '~' && searched[j] != "/"
                            && searched[j] != "$") {
                            lnamestr += searched[j];
                        }
                        else {
                            break;
                        }


                    }
                    lnamel.push(lnamestr);
                }

                if (searched[i] == '_') {
                    citystr = "";
                    for (j = i + 1; j < searched.length; j++) {
                        if (searched[j] != '$' && searched[j] != '^' && searched[j] != '~' && searched[j] != "/" && searched[j] != "_") {
                            citystr += searched[j];
                        }
                        else {
                            break;
                        }


                    }
                    cityl.push(citystr);
                }

                if (searched[i] == '~') {
                    cont1 = "";
                    for (j = i + 1; j < searched.length; j++) {
                        if (searched[j] != '$' && searched[j] != '_' && searched[j] != '~' && searched[j] != "/" && searched[j] != "^") {
                            cont1 += searched[j];
                        }
                        else {
                            break;
                        }


                    }
                    contl.push(cont1);
                }
                if (searched[i] == '/') {
                    collstr = "";
                    for (j = i + 1; j < searched.length; j++) {
                        if (searched[j] != '$' && searched[j] != '_' && searched[j] != '~' && searched[j] != "/" && searched[j] != "^") {
                            collstr += searched[j];
                        }
                        else {
                            break;
                        }


                    }
                    colllist.push(collstr);
                }




            }
            console.log(fnamel);

            var str = ``;
            if (fnamel.length != 0) {
                if (str != ``) {
                    str += `${selected}`;
                }
                fname_data = `(first_name='${fnamel[0]}'`;
                for (i = 1; i < fnamel.length; i++) {
                    fname_data += `OR first_name='${fnamel[i]}'`;

                }
                fname_data += `)`;
                str += fname_data;
            }


            if (lnamel.length != 0) {
                if (str != ``) {
                    str += `${selected}`;
                }
                lname_data = `(last_name='${lnamel[0]}'`;
                for (i = 1; i < lnamel.length; i++) {
                    lname_data += `OR last_name='${lnamel[i]}'`;

                } lname_data += `)`
                str += lname_data;
            }

            if (cityl != 0) {
                if (str != ``) {
                    str += `${selected}`;
                }
                city_data = `(city='${cityl[0]}'`;
                for (i = 1; i < cityl.length; i++) {
                    city_data += `OR city='${cityl[i]}'`;

                }
                city_data += `)`
                str += city_data;
            }


            if (contl.length != 0) {
                if (str != ``) {
                    str += `${selected}`;
                }
                cont_data = `(contact='${contl[0]}'`;
                for (i = 1; i < contl.length; i++) {
                    cont_data += `OR contact='${contl[i]}'`;

                }
                cont_data += ')';
                str += cont_data;
            }


            if (colllist.length != 0) {
                if (str != ``) {
                    str += `${selected}`;
                }
                coll_data = `(college='${colllist[0]}'`;
                for (i = 1; i < colllist.length; i++) {
                    coll_data += `OR college='${colllist[i]}'`;

                }
                coll_data += `)`
                str += coll_data;
            }

            var sql3;
            if (str == ``) {
                sql3 = `select * from student_express`;
            }
            else {
                sql3 = `select * from student_express where` + str;
            }


            console.log(sql3);

            con1.query(sql3, function (error, result2) {
                if (error) {
                    console.log(error);
                }
                else {
                    search_data = result2;
                    count_record = result2.length;
                    console.log(count_record);
                    res.render("task4", { data: search_data, searched, count_record });

                }
            });
        }
    });

}

