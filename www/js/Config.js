var Config = (function(){
    var authToken = localStorage.getItem("authToken");
    var emailAddress = localStorage.getItem("email");
    var loggedIn = false;
    var uploadData = false;
    var latitude = null;
    var longitude = null;
    var dummyMode = true;

    return{
        authToken: authToken,
        emailAddress: emailAddress,
        loggedIn: loggedIn,
        uploadData: uploadData,
        latitude: latitude,
        longitude: longitude,
        dummyMode: dummyMode
    }
})();