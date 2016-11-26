var endPoint = "http://10.10.3.102/"

var checkLoginCredentials = (function (email, password) {
    var hasBeenCalled = false;
    return function () {
        if (!hasBeenCalled) {
            var checkCredentialsRequest = new XMLHttpRequest();
            checkCredentialsRequest.onreadystatechange = function {
                if (this.readyState == 4 && this.statusText == "OK") {
                    // proceed to main page
                }
                else {
                    var response = JSON.parse(this.responseText);
                    console.log(response);
                }
            }
            checkCredentialsRequest.open("GET", endPoint, true);
            checkCredentialsRequest.send();
            hasBeenCalled = true;
        }
    }
    else {
        console.log("PLS WAIT //LOGIN");
    }
})()

var signUp = (function (email, password) {
    var hasBeenCalled = false;
    return function () {
        if (!hasBeenCalled) {
            var signUpRequest = new XMLHttpRequest();
            signUpRequest.onreadystatechange = function {
                if (this.readyState == 4 && this.status == 200) {
                    // show message that user should check email and confirm
                }
            }
            signUpRequest.open("GET", endPoint, true);
            signUpRequest.send();
            hasBeenCalled = true;
        }
    }
    else {
        console.log("PLS WAIT //SIGN UP");
    }
})()