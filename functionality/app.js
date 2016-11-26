var server = "http://10.10.3.102/";
var userEmail;


function getUserCredentials(isForLogin) {
    if (!isForLogin) {
        var emailForm = document.getElementById("signUpEmailTextField"),
            passwordForm = document.getElementById("signUpPasswordTextField");
        var nameForm = document.getElementById("signUpNameTextField");
        return {
            email: emailForm.value,
            password: passwordForm.value,
            name: nameForm.value
        };
    } else {
        var emailForm = document.getElementById("loginEmailTextField"),
            passwordForm = document.getElementById("loginPasswordTextField");
        return {
            email: emailForm.value,
            password: passwordForm.value
        };
    }
}

function sendRequest(requestType, endpoint, data, successCallback, errorCallback) {
    var link = "?";

    for (var key in data) {
        var value = data[key];
        if (link.length > 1) {
            link += "&" + key + "=" + value;
        } else {
            link += key + "=" + value;
        }
    }


    $.ajax({
        type: requestType,
        url: server + endpoint + link,
        dataType: 'json',
        success: successCallback,
        error : errorCallback
    });
}

function onPageLoad() {
    var headerMessage = document.getElementById("headerMessage"),
        signUpForm = document.getElementById("SignUpForm"),
        loginForm = document.getElementById("LoginForm"),
        coursesMainPage = document.getElementById("CoursesPage"),
        createCourseForm = document.getElementById("createCourseForm");

    loginForm.style.display = "block";
    signUpForm.style.display = "none";
    coursesMainPage.style.display = "none";
    createCourseForm.style.display = "none";

    var loginButton = document.getElementById("loginButton");
    loginButton.onclick = function () {
        sendRequest("POST", "login", getUserCredentials(true),
            function () {
                loginForm.style.display = "none";
                signUpForm.style.display = "none";
                coursesMainPage.style.display = "block";
                console.log('SUCCESS');
            }, function () {
                var errorMessage = document.getElementById("loginErrorMessage");
                errorMessage.style.display = "block";
                console.log("EROARE");
            });
    };

    var changeToSignUpButton = document.getElementById("changeToSignUpButton");
    changeToSignUpButton.onclick = function () {
        loginForm.style.display = "none";
        signUpForm.style.display = "block";
        headerMessage.innerHTML = "Pagina de Sign Up";
    };

    var signUpButton = document.getElementById("signUpButton");
    signUpButton.onclick = function () {
        sendRequest("POST", "sign_up", getUserCredentials(false), printServerResponseMessage, printServerResponseMessage);
    };

    var createCourseButton = document.getElementById("createCourseBtn");
    createCourseButton.onclick = function () {
        createCourseForm.style.display = "block";
        // coursesMainPage.style.display = "none";
    }
}

onPageLoad();

