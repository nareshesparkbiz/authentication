// exports.hello_world
// {const express=require('express');
// const app=express();


// app.set('view engine','ejs');

// app.get('/hello_world',(req,res)=>{
//     res.render('hello',{name:"world!"});
// });


// }

module.exports = async function(){
    return {name:"world!"};
}