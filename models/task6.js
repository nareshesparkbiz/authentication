
const util = require("util");
const { promisify } = require("util");
const mysql = require('mysql2');




module.exports=async function(req,res,app,con){

    var data1 = {};

  
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            var sql1 = `select  state_name from state_master order by id asc`;
    
            var sql2 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='relation'`;
    
            var sql3 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='gender'`;
    
            var sql4 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='course'`;
    
            var sql5 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='pref_location'`;
    
            var sql6 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='department'`;
    
            var sql7 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='languages'`;
    
            var sql8 = `select select_name,option_value from select_master,option_master where select_master.id=select_id and select_name='technologies'`;
    
    
    
            con.query(sql1, (error, result) => {
                data1['state'] = result;
                console.log(data1);
                con.query(sql2, (error, result1) => {
                    data1['relation'] = result1;
    
                    con.query(sql3, (error, result2) => {
                        data1['gender'] = result2;
                        con.query(sql4, (error, result3) => {
                            data1['course'] = result3;
                            con.query(sql5, (error, result4) => {
                                data1['pref_location'] = result4;
                                // console.log(data1);
                                con.query(sql6, (error, result5) => {
                                    data1['department'] = result5;
    
                                    con.query(sql7, (error, result6) => {
                                        data1['languages'] = result6;
                                        con.query(sql8, (error, result7) => {
                                            data1['technologies'] = result7;
                                            // console.log(data1)
                                            res.render('job_data', { data: data1 });
                                        });
                                    });
                                });
                            });
                        });
                    })
                })
    
            })
    
        }
    
    
    
    
    // -------------------------------------------use of ajax and display state and city-------------------------
    app.get('/task6_state', (req, res) => {
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            var state = req.query.state;
    
            const query1 = `select city_name AS Data from state_master,city_master where state_master.id=city_master.s_id and state_name='${state}' `;
    
            con.query(query1, (err, result) => {
                if (err) throw err;
                var data_arr = []
    
                result.forEach(function (row) {
                    data_arr.push(row.Data);
                })
    
                res.json(data_arr);
            });
        }
    });
    var d_id = [];
    // ------------------------------------------------ Soft delete----------------------------------------------
    app.get("/delete", (req, res) => {
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            d_id = req.query.id;
            console.log(d_id);
    
            var query2 = `update basic_details set is_deleted=1 where id=${d_id}`;
    
    
            con.query(query2, (err, result) => {
                if (err) throw err;
    
    
    
    
                // console.log(result.changedRows)
                res.json(result);
    
    
            });
    
        }
    
    });
    
    //  -------------------------------------Multiple delete-----------------------------------------------
    app.get('/deleteall', (req, res) => {
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            let did = req.query.id;
            console.log(did);
    
            con.query(`update basic_details set is_deleted=1 where id in (${did})`, (err) => { if (err) throw err; })
        }
    });
    // -----------------------------------------------------Data insert ------------------------------------------
    var data12 = [];
    
    app.post("/form", (req, res) => {
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            var fname = req.body.name1;
            var lname = req.body.name2;
            var designation = req.body.des1;
            var address1 = req.body.add1;
            var address2 = req.body.add2;
            var email = req.body.email1;
            var cont1 = req.body.con1;
            var city = req.body.city;
            var gender = req.body.gender;
            var state = req.body.state;
            var zipcode = req.body.zip1;
            var relation = req.body.relation;
            var date_birth = req.body.dob;
    
    
            // ------------------------------------------------Education Details--------------------------------------
    
            var e_course = req.body.course;
    
            var e_board = req.body.board;
    
    
            var e_year = req.body.year;
    
    
            var e_percentage = req.body.percen;
    
    
    
            var academic = [];
            for (i = 0; i < e_course.length; i++) {
                academic[i] = [e_course[i], e_board[i], e_year[i], e_percentage[i]];
                // academic[]=[e_course[1],e_board[1],e_year[1],e_percentage[1]];
                // academic[]=[e_course[2],e_board[2],e_year[2],e_percentage[2]];
            }
            // console.log(academic);
    
    
    
            // ----------------------------------------------------work Experience--------------------------------
    
            var comp1 = req.body.comp1;
            var comp2 = req.body.comp2;
            var comp3 = req.body.comp3;
    
            var des1 = req.body.dest1;
            // console.log(des1);
            var des2 = req.body.des2;
            // console.log(des2);
    
            var des3 = req.body.des3;
            // console.log(des3);
    
    
            var start1 = req.body.start1;
            var start2 = req.body.start2;
            var start3 = req.body.start3;
    
            var end1 = req.body.end1;
            var end2 = req.body.end2;
            var end3 = req.body.end3;
    
            var work = []
    
    
            work['0'] = [comp1, des1, start1, end1];
            work['1'] = [comp2, des2, start2, end2];
            work['2'] = [comp3, des3, start3, end3];
    
            // console.log(work);
            // console.log(data1['languages']);
    
    
    
            // ---------------------------------Languages and Technologies----------------------------------------------
    
            var languages = [];
            var technologies = [];
            var lan = []
    
            var techno = [];
            var techexp;
    
            con.query(`select count(option_value) as count from  option_master where select_id=7`, (err, result) => {
                // console.log(result[0]['option_value']);
    
                lang_count = result[0]['count']
                // console.log(lang_count)
                for (i = 1; i <= lang_count; i++) {
                    var lg = req.body['lang' + i]
                    // console.log(lg);
                    var langexp = req.body[lg];
                    // console.log(langexp);
    
                    if (lg != undefined) {
    
    
                        lan.push(lg);
                        //{'languagess':{'English': ['REad','Write','Speak']}}
    
                    }
                }
    
                console.log(lan)
    
    
                var tech12 = {}
                var techcount = 0;
                var tech1 = [];
    
                con.query(`select count(option_value) as count from option_master where select_id=8`, (err, result1) => {
    
                    // tech_count = result1[0]['count'];
                    // console.log(tech_count)
    
                    if (err) {
                        console.log(err)
                    }
                    else {
                        techcount = result1[0]['count'];
                        for (let i = 1; i <= techcount; i++) {
                            var tlg = req.body['techlang' + i];
                            console.log(tlg);
                            var tlgexp = req.body[tlg];
                            console.log(tlgexp);
                            if (tlg != undefined) {
                                if (tlgexp != undefined) {
                                    tech12[tlg] = tlgexp;
                                    tech1.push(tlg);
                                }
                            }
                        }
    
    
    
                        console.log(tech12)
                        console.log(tech1)
    
    
    
    
    
    
                        // console.log(technologies);
                        // console.log(techno);
    
    
    
                        // -----------------------------------------Query Executed---------------------------------------------
    
                        var c_key;
                        var sql11 = `insert into basic_details(first_name ,last_name,designation,address1,address2,city,email,pincode,dob,gender,phone_number,state,relation_status,create_date,is_deleted) values('${fname}','${lname}','${designation}','${address1}','${address2}','${city}','${email}','${zipcode}','${date_birth}','${gender}','${cont1}','${state}','${relation}',current_timestamp,0)`;
    
    
                        con.query(sql11, (err, result) => {
                            if (err) throw err;
                            c_key = result.insertId;
                            console.log(c_key);
                            // ---------------------------------------------Academic query-----------------------------------------
                            for (i = 0; i < academic.length; i++) {
                                con.query(`insert into academic_details( c_id,course_name,board,passing_year,percentage) values('${c_key}','${academic[i][0]}','${academic[i][1]}','${academic[i][2]}','${academic[i][2]}')`, (err) => {
                                    if (err) throw err;
    
                                })
                            }
    
                            // -----------------------------------------------Work query----------------------------------------
    
                            for (i = 0; i < work.length; i++) {
                                if (work[i][0] != undefined) {
                                    con.query(`insert into experiences(c_id,comp_name,designation,start_date,end_date) values ('${c_key}','${work[i][0]}','${work[i][1]}','${work[i][2]}','${work[i][3]}')`, (error) => {
                                        if (error) throw error;
                                    });
                                }
                                else {
                                    break;
                                }
                            }
                            // ---------------------------------------------language query-----------------------------------------
                            for (var i = 0; i < lan.length; i++) {
                                var sqllan = `INSERT INTO languages (c_id,lang, read_status, write_status, speak_status) VALUES ('${c_key}','${lan[i]}', '${(read) ? (read.includes(lan[i]) ? 'yes' : 'no') : 'no'}', '${(write) ? (write.includes(lan[i]) ? 'yes' : 'no') : 'no'}', '${(speak) ? (speak.includes(lan[i]) ? 'yes' : 'no') : 'no'}')`;
                                con.query(sqllan, (err, result) => { if (err) throw err; });
                            }
    
                            //     //    -----------------------------------------Technologies query-------------------------------------------
                            for (i = 0; i < tech1.length; i++) {
                                var tech_lang = tech1[i];
                                con.query(`insert into technologies(c_id,tech_name,star) values('${c_key}','${tech_lang}','${tech12[tech_lang]}')`, (err) => {
                                    if (err) throw err;
                                })
                            }
    
                            //     // -----------------------------------------------references query-------------------------------------------
                            for (i = 0; i < references.length; i++) {
                                if (references[i][0] != undefined) {
                                    con.query(`insert into refrances(c_id,ref_name,ref_contact,relation) values(${c_key},'${references[i][0]}','${references[i][1]}','${references[i][2]}')`, (err) => {
                                        if (err) throw err;
                                    });
                                }
                            }
    
                            //    -------------------------------------------Preferences query-----------------------------------------
    
                            con.query(`insert into preferences(c_id,prefered_location,expected_ctc,current_ctc,notice_period,department) values(${c_key},'${pref_location}','${expec_ctc}','${curr_ctc}','${notice}','${department}')`, (err) => {
                                if (err) throw err;
                            })
    
                        });
                        var sql12 = `select * from basic_details where (is_deleted=0);`
                        con.query(sql12, (err, result2) => {
    
    
                            data12 = result2;
                            // console.log(data12);
    
                            res.render("data_sucess", { data: data12, searched, count_record });
    
                        })
                    }
                });
    
            });
            var read = req.body.read;
            console.log(read);
            var write = req.body.write;
            console.log(write);
    
            var speak = req.body.speak;
            console.log(speak);
    
    
    
    
    
            // ---------------------------------------------references-------------------------------------------
    
            var rname1 = req.body.rname1;
            var rname2 = req.body.rname2;
            var rname3 = req.body.rname3;
            var rname4 = req.body.rname4;
    
    
            var rcont1 = req.body.rcont1;
            var rcont2 = req.body.rcont2;
            var rcont3 = req.body.rcont3;
            var rcont4 = req.body.rcont4;
    
    
            var rel1 = req.body.rel1;
            var rel2 = req.body.rel2;
            var rel3 = req.body.rel3;
            var rel4 = req.body.rel4;
    
    
    
    
            var references = [];
    
            references['0'] = [rname1, rcont1, rel1];
            references['1'] = [rname2, rcont2, rel2];
            references['2'] = [rname3, rcont3, rel3];
            references['3'] = [rname4, rcont4, rel4];
    
            console.log(references)
    
            // ----------------------------------------preferences-----------------------------------------------
    
            var pref_location = req.body.pref_location;
            var notice = req.body.notice;
            var department = req.body.dep1;
            var expec_ctc = req.body.expec1;
            var curr_ctc = req.body.crctc1;
    
    
    
            // ---------------------------------------------------select basic table----------------------------------   
    
        }
    
    });
    
    
    // -------------------------------------------form listing--------------------------------------------------
    app.get('/form', (req, res) => {
        const tokens = req.cookies.tokens;
        if (!tokens) {
            return res.redirect("/logout")
        }
        else {
            var sql12 = `select * from basic_details where (is_deleted=0);`
            con.query(sql12, (err, result2) => {
    
    
                data12 = result2;
                // console.log(data12);
    
                res.render("data_sucess", { data: data12, searched, count_record: result2.length });
    
            });
        }
    })
    
    
    // ----------------------------------------------Search---------------------------------------------------
    var searched;
    var selected;
    var search_data;
    var count_record;
    var city_data;
    var fname_data;
    var lname_data;
    var cont_data;
    var coll_data;
    
    
    app.get("/task6_search", function (req, res) {
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
    
            var pincodelist = [];
            var pinstr = "";
    
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
                    pinstr = "";
                    for (j = i + 1; j < searched.length; j++) {
                        if (searched[j] != '$' && searched[j] != '_' && searched[j] != '~' && searched[j] != "/" && searched[j] != "^") {
                            pinstr += searched[j];
                        }
                        else {
                            break;
                        }
    
    
                    }
                    pincodelist.push(pinstr);
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
                cont_data = `(phone_number='${contl[0]}'`;
                for (i = 1; i < contl.length; i++) {
                    cont_data += `OR phone_number='${contl[i]}'`;
    
                }
                cont_data += ')';
                str += cont_data;
            }
    
    
            if (pincodelist.length != 0) {
                if (str != ``) {
                    str += `${selected}`;
                }
                coll_data = `(pincode='${pincodelist[0]}'`;
                for (i = 1; i < pincodelist.length; i++) {
                    coll_data += `OR pincode='${pincodelist[i]}'`;
    
                }
                coll_data += `)`
                str += coll_data;
            }
    
            var sql3;
            if (str == ``) {
                sql3 = ` SELECT * FROM job_application.basic_details where (is_deleted=0)`;
            }
            else {
                sql3 = ` SELECT * FROM job_application.basic_details where (is_deleted!=1) and ` + str;
            }
    
    
            console.log(sql3);
    
            con.query(sql3, function (error, result2) {
                if (error) {
                    console.log(error);
                }
                else {
                    search_data = result2;
                    count_record = result2.length;
                    console.log(count_record);
                    res.render("data_sucess", { data: search_data, searched, count_record });
                }
    
            });
        }
    });
}