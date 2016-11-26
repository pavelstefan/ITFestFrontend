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

function sendRequest(requestType, endpoint, data, successCallback, errorCallback) {
    var link = "?";

    for(var key in data){
        var value = data[key];
        if(link.length > 1){
            link += "&" + key + "=" + value;
        } else {
            link += key + "=" + value;
        }
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        var response = JSON.parse(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
                successCallback(response);
            } else {
                errorCallback(response);
            }
        };
    request.open(requestType, server + endpoint + link, true);
    request.send();
}



var onPageLoad = function () {
    var signUpForm = document.getElementById("SignUpForm"),
        loginForm = document.getElementById("LoginForm");

    signUpForm.style.display = "none";

    var loginButton = document.getElementById("loginButton"),
        changeToSignUpButton = document.getElementById("changeToSignUpButton");


    loginButton.onclick = function () {
        sendRequest("POST", "login", getUserCredentials(true),
            function(responseFromServer) {

        }, function (responseFromServer) {
            var errorMessage = document.getElementById("loginErrorMessage");
            errorMessage.innerHTML = responseFromServer.message;
        });
    };

    changeToSignUpButton.onclick = function () {
        loginForm.style.display = "none";
        signUpForm.style.display = "block";
    };

    var signUpButton = document.getElementById("signUpButton");
    signUpButton.onclick = function () {
        sendRequest("POST", "sign_up", getUserCredentials(false), printServerResponseMessage, printServerResponseMessage);
    };


};
                    