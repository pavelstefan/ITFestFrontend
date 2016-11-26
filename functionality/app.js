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
    var link = "";
    if(data != null){
       link = "?";
    }

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


function showCourses(){
    function populateCourseList(param){
        var coursesPage = document.getElementById("CoursesPage");

        for(var i = 0; i < param.length; i++){
            var courseData = param[i];
            var newCourseDiv = document.createElement("div");
            newCourseDiv.setAttribute("class","classI");
            newCourseDiv.innerHTML =
                '<h2>' + courseData.name + '</h2>' +

                '<span class="classDetails-content"><button id="subToCourse">Subscribe</button></span>' +

                '<span class="classDetails-content"><button id="createEventBtn">Create Event</button></span>' +

                '<span class="classDetails-content"><u>Name:</u></span>&nbsp' + courseData.name +

                '<span class="classDetails-content"><u>Host:</u></span>&nbsp'+ courseData.moderator +

                '<span class="classDetails-content"><u>About</u></span>&nbspUn curs fain';

            coursesPage.appendChild(newCourseDiv);
        }
    }

    sendRequest("GET", "course", null, populateCourseList, null)
}

function onPageLoad() {
    var headerMessage = document.getElementById("headerMessage"),
        signUpForm = document.getElementById("SignUpForm"),
        loginForm = document.getElementById("LoginForm"),
        coursesMainPage = document.getElementById("CoursesPage"),
        createCourseForm = document.getElementById("createCourseForm"),
        createEventForm = document.getElementById("createEventForm");


        loginForm.style.display = "block";
        signUpForm.style.display = "none";
        coursesMainPage.style.display = "none";
        createCourseForm.style.display = "none";
        createEventForm.style.display = "none";


    var loginButton = document.getElementById("loginButton");
    loginButton.onclick = function () {
        sendRequest("POST", "login", getUserCredentials(true),
            function () {
                loginForm.style.display = "none";
                signUpForm.style.display = "none";
                coursesMainPage.style.display = "block";
                console.log('SUCCESS');
                showCourses();

            }, function () {
                var errorMessage = document.getElementById("loginErrorMessage");
                errorMessage.style.display = "block";
                console.log("EROARE");
            });
        userEmail = getUserCredentials(true).email;
    };

    var changeToSignUpButton = document.getElementById("changeToSignUpButton");
    changeToSignUpButton.onclick = function () {
        loginForm.style.display = "none";
        signUpForm.style.display = "block";
        headerMessage.innerHTML = "Pagina de Sign Up";
    };

    var signUpButton = document.getElementById("signUpButton");
    signUpButton.onclick = function () {
        sendRequest("POST", "signup", getUserCredentials(false),
            function () {
                loginForm.style.display = "none";
                signUpForm.style.display = "none";
                coursesMainPage.style.display = "block";
                console.log('SUCCESS');
                showCourses();

            }, function () {
                var errorMessage = document.getElementById("loginErrorMessage");
                errorMessage.style.display = "block";
                console.log("EROARE");
            });
    };

    var createCourseButton = document.getElementById("createCourseBtn");
    createCourseButton.onclick = function () {
        createCourseForm.style.display = "block";
        var courses = document.getElementsByClassName("classI");
        for(var i = 0; i < courses.length; i++){
            courses[i].style.display = "none";
        }
    };

    var createCourseButton2 = document.getElementById("createCourseBtn2");
    createCourseButton2.onclick = function () {
        var newCourseName = document.getElementById("courseNameTextField");
        var newSchool = document.getElementById("schoolNameTextField");

        sendRequest("POST", "createcourse", {name : newCourseName.value, email : userEmail, school : newSchool.value},
            function () {
                createCourseForm.style.display = "none";
                showCourses();
            }, function () {
                console.log("las-o asa");
            });
    }

}

onPageLoad();

