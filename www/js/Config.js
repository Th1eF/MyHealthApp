var Config = (function(){
    var authToken = localStorage.getItem("authToken");
    var emailAddress = localStorage.getItem("email");
    var loggedIn = false;

    return{
        authToken: authToken,
        emailAddress: emailAddress,
        loggedIn: loggedIn
    }
})();