function validatename() {
    var nameerr = document.getElementById("name1")
    var uname = document.getElementById("name").value;

    console.log(uname)

    if (uname == "" || uname == "null") {
        // alert("Enter your Name Please!");
        document.getElementById("name1").innerHTML = "Enter your name Please!";
        return false;
    }
    else if (!isNaN(uname)) {

        document.getElementById("name1").innerHTML = "Enter Characters only!"
        return false
    }
    else {
        document.getElementById("name1").innerHTML = null

        return true
    }
}

async function validateemail() {

    var email = document.getElementById("email").value;
    var flag = false;


    if (flag == false) {

        await fetch("/email?email=" + email + "").then((res) => {
            return res.json()
        }).then((resdata) => {
            console.log(resdata);
            if (email == resdata) {
                document.getElementById('email1').innerHTML = "Email alredy registered!.....";
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

async function validatepass() {

    var pass = document.getElementById("pasw").value;
    var repass = document.getElementById("repasw").value;
    var namech = validatename()
    var emailch = validateemail()
  





    if (pass == "" || pass == "null") {
        document.getElementById("password1").innerHTML = "Please Enter Your Password!"
        return false;
    }
    else {
        if (pass.length < 8) {
            document.getElementById("password1").innerHTML = "Password contains less than 8 characters!";
            return false;

        }
        else {
            var ele = document.getElementById("pasw").value;
            var reg = /^[A-Za-z]\w{2-9}$/;
            if (ele.match(reg)) {

                document.getElementById("password1").innerHTML = "Password is Valid";
                document.getElementById("submit").disabled = false;
                return true
            }

            else {
                if (pass != repass) {
                    document.getElementById('password1').innerHTML = "Password doesn't match";
                    // console.log("false")
                    return false;
                }
                else {

                    if (pass === repass) {
                        document.getElementById('password1').innerHTML = null;
                        document.getElementById("submit").disabled = false;
                        return true;
                    }
                    else {
                        document.getElementById("password1").innerHTML = "Passwod is not valid";
                        return false;
                    }
                }
            }


        }
    }}




function pwdverify() {
    console.log("bdfghejkfh");
    var psw = document.getElementById('pasw').value;

    var strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})') 

    // var strongPassword = /^[A-Za-z0-9]*$/
    var mediumPassword =new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    let passshow = document.getElementById('password1');

    if (psw.match(strongPassword)) {
        passshow.style.color = "green";
        passshow.innerHTML = "strong"
    } else if (psw.match(mediumPassword)) {
        passshow.style.color = "blue";
        passshow.innerHTML = "medium"
    } else {
        passshow.style.color = "red";
        passshow.innerHTML = "weak"
    }

}

