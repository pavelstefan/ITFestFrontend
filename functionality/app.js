var server = "http://10.10.3.102/";
var userEmail;

function getUserCredentials(isForLogin) {
    if(!isForLogin){
        var emailForm = document.getElementById("signUpEmailTextField"),
            passwordForm = document.getElementById("signUpPasswordTextField");
            var nameForm = document.getElementById("signUpNameTextField");
        return { 
            email : emailForm.value,
            password : passwordForm.value,
            name : nameForm.value 
        };
    } else {
        var emailForm = document.getElementById("loginEmailTextField"),
            passwordForm = document.getElementById("loginPasswordTextField");
        return { 
            email : emailForm.value,
            password : passwordForm.value
        };
    }
}



function sendRequest(requestType, endpoint, data, doIUseCallback, successCallback, failureCallback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (doIUseCallback == true) {
            var responseText = this.responseText;
            if (this.readyState == 4 && this.status == 200) {
                successCallback(responseText);
            } else {
                failureCallback(responseText);
            }
        }
    }
    request.open(requestType, endpoint, true);
    request.send(data);
}

function printServerResponseMessage(responseFromServer){
    var response = JSON.parse(responseFromServer);
    console.log(response.message);
}    

var onPageLoad = function () {
    var loginButton = document.getElementById("loginButton"),
        signUpButton = document.getElementById("changeToSignUpButton");


    loginButton.onclick = function () {
        sendRequest("GET", server + "login", getUserCredentials(true),
                    true, printServerResponseMessage, printServerResponseMessage);
    };
    signUpButton.onclick = function () {
        var submitForm = document.getElementById("SubmitForm"),
            loginForm = document.getElementById("LoginForm");
        loginForm.style.display = "none";
        submitForm.style.display = "block";
        
//        sendRequest("POST", server += "/sign_up", getUserCredentials(false), 
//                    true, printServerResponseMessage, printServerResponseMessage);
    };
};
                    