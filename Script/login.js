window.addEventListener('DOMContentLoaded',()=>{

    console.log("=> Connected to Login js");

    let regexEmail=RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$');
    let regexPass=RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');


    let userName = document.getElementById('emailId');
    let password = document.getElementById('pass');

    let Login = document.getElementById('Login');

    let  un=0, psw=0;
    
    const showError = (inputId,spanId,errMsg,beforeinput,afterinput) =>{
      console.log(errMsg);
      document.getElementById(inputId).classList.remove(beforeinput);
      document.getElementById(inputId).classList.add(afterinput);
      document.getElementById(spanId).classList.add('Errmsg');
      document.getElementById(spanId).innerHTML = errMsg;
      return false;
  };

  const showSuccess = (inputId,spanId,beforeinput,afterinput) => {
      document.getElementById(inputId).classList.add(beforeinput);
      document.getElementById(inputId).classList.remove(afterinput);
      document.getElementById(spanId).classList.remove('Errmsg');
      document.getElementById(spanId).textContent = "";
      return true;
  };

  userName.addEventListener('keyup',()=>{
    console.log(userName.id);
      un=check(userName,'beforeinput','afterinput','emailHint',"Enter Valid Email address",regexEmail )
  });

  password.addEventListener('keyup',()=>{
    console.log(password.id);
      psw=check(password,'beforeinput','afterinput','passHint',"Enter Valid Password",regexPass )
  });



  function check(input,beforeinput,afterinput,spanId,errMsg,regex){
    if (!regex.test(input.value)) {
        a = showError(input.id,spanId,errMsg,beforeinput,afterinput);
        return 0;
      } else {
        a= showSuccess(input.id,spanId,beforeinput,afterinput);
        return 1;
      }
   };


Login.addEventListener('click', () => {
  let Logindata = {
    Email: userName.value,
    Password: password.value
  }
  console.log(Logindata);
  
  $.ajax({
    url: `https://localhost:44349/User/Login/${Logindata.Email}/${Logindata.Password}`,
    type: "POST",
    data: JSON.stringify(Logindata),
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (result) {
      console.log(result);
      localStorage.setItem('token',result.data);
    },
    error: function (error) {
      console.log(error);
    }
  })
})

function Resetpage(){
  document.getElementById('login-form').reset();
}

})

function show()
{
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}