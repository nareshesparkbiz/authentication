async function validateemail() {

    var email = document.getElementById("email").value;
    var flag = false;


    if (flag == false) {

        await fetch("/email?email="+ email + "").then((res) => {
            return res.json()
        }).then((resdata) => {
            console.log(resdata);
            if (email != resdata) {
                document.getElementById('email1').innerHTML = "Email not  registered!.....";
                flag = false;
            }
            else {
               
                document.getElementById('email1').innerHTML = null;

                flag = true;
            }

        })
        return flag

    }

}

 async function validate_password(){
   
    var check_pass=document.getElementById("pasw").value;
    var emailed=document.getElementById("email").value;
await fetch("/password?check="+check_pass+"&email="+emailed+"").then((res)=>{
  return res.json()
}).then((result)=>{
    console.log(result);
    if(result=="false"){
        document.getElementById("password1").style.color = "red";
        document.getElementById("password1").innerHTML="**Wrong password"
        
    }
    else{
        document.getElementById("password1").style.color = "green";
        document.getElementById("password1").innerHTML="Correct Password"
        document.getElementById("submit").disabled = false;

    }
    

})
}
