var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.signUpController = new SignIn.SignUpController();
        app.signInController = new SignIn.SignInController();
        app.ChangePassword = new SignIn.ChangePassword();

        sensorData.init();

        //Check if authToken in localstorage
        if(typeof(Storage !== "undefined")){
            if(Config.authToken && Config.emailAddress){
                console.log("An auth token and email exists");
                $.ajax({
                    type: 'GET',
                    url: 'http://138.197.130.124/verifyKeepLogin.php',
                    data: {
                        authToken: Config.authToken,
                        emailAddress: Config.emailAddress
                    },
                    dataType: 'json',
                    success: function(user){
                        Config.loggedIn = true;
                        Config.authToken = localStorage.getItem("authToken");
                        Config.emailAddress = localStorage.getItem("email");
                        console.log("Logged in user successfully");
                        console.log("navigating to main page...");
                        console.log(user);
                        $('.panel_userName').text(user["user"].firstName + " " + user["user"].lastName);
                        $.mobile.navigate("#mainPage", {transition: "slideup"});
                    },
                    error: function(xhr, ajaxOptions, thrownError){
                        console.log("Error Code: " + xhr.status);
                        console.log("Error Response: " + xhr.responseText);
                        console.log("Thrown Error: " + thrownError);
                    }
                });
            }else{
                console.log("no auth token");
            }

            $('.logoutButton').on('click', function(){
                console.log("Clicked logout button");
                $.ajax({
                    type: 'POST',
                    url: 'http://138.197.130.124/logout.php',
                    data: {
                        emailAddress: Config.emailAddress
                    },
                    success: function(){
                        console.log("Logged out user successfully");
                        $('.panel_userName').text("");
                        localStorage.clear();
                        Config.loggedIn = false;
                    },
                    error: function(xhr, ajaxOptions, thrownError){
                        console.log("Error Code: " + xhr.status);
                        console.log("Error Response: " + xhr.responseText);
                        console.log("Thrown Error: " + thrownError);
                    }
                });
            });
        }

        $(document).on("pagecontainerbeforeshow", function (event, ui) {
            if (typeof ui.toPage == "object") {
                switch (ui.toPage.attr("id")) {
                    case "page-signup":
                        app.signUpController.resetSignUp();
                        break;

                    case "page-signin":
                        app.signInController.resetSignIn();
                        break;

                    case "page-settingsPage":
                        app.ChangePassword.resetSettings();
                        break;
                }
            }
        });

        $('#settingsPage').on('pageshow', function (e) {
            app.ChangePassword.init();
            app.ChangePassword.$confirmBtn.off("tap").on("tap", function () {
                app.ChangePassword.onPassChange();
            });
        });

        $('#beginResetPasswordButton').on('click', function(){
            var invisibleStyle = "bi-invisible";
            var invalidInputStyle = "bi-invalid-input";
            var emailAddress = $('#txt-email').val().trim();
            var token = $('#token').val().trim();
            var errMsg = $('#beginResetErr');
            errMsg.html("");
            errMsg.removeClass().addClass(invisibleStyle);
            if(token){
                $.ajax({
                    type: 'POST',
                    url: 'http://138.197.130.124/resetPasswordVerifyCode.php',
                    data: {
                        emailAddress: emailAddress,
                        token: token
                    },
                    success: function(){
                        console.log("Token is valid, going to reset password page");
                        $.mobile.navigate("#end-password-reset", {transition: "slide"});

                    },
                    error: function(xhr, ajaxOptions, thrownError){
                        console.log("Error Code: " + xhr.status);
                        console.log("Error Response: " + xhr.responseText);
                        console.log("Thrown Error: " + thrownError);
                        errMsg.html("<p>Invalid login credentials.</p>");
                        errMsg.addClass("bi-ctn-err").slideDown();
                        $('#txt-email').addClass(invalidInputStyle);
                        $('#token').addClass(invalidInputStyle);
                    }
                });
            }
            else{
                $.ajax({
                    type: 'POST',
                    url: 'http://138.197.130.124/resetPasswordSendToken.php',
                    data: {
                        emailAddress: emailAddress
                    },
                    success: function(){
                        console.log("Sent code to reset password");
                        //TODO MAKE TOKEN AND LABEL VISIBLE ONLY AFTER CODE IS SENT
                        //$('#token').style.visibility = "visible";
                        //$('#tokenLabel').style.visibility = "visible";
                    },
                    error: function(xhr, ajaxOptions, thrownError){
                        console.log("Error Code: " + xhr.status);
                        console.log("Error Response: " + xhr.responseText);
                        console.log("Thrown Error: " + thrownError);
                        errMsg.html("<p>Invalid login credentials.</p>");
                        errMsg.addClass("bi-ctn-err").slideDown();
                        $('#txt-email').addClass(invalidInputStyle);
                        $('#token').addClass(invalidInputStyle);
                    }
                });
            }
        });

        //TODO FIX PASSWORD FIELDS ACCEPTING SIMPLE PASSWORDS
        $('#endResetPasswordButton').on('click', function(){
            var invisibleStyle = "bi-invisible";
            var invalidInputStyle = "bi-invalid-input";
            var emailAddress = $('#txt-email').val().trim();
            var newPassword = $('#txt-new-password').val().trim();
            var newPasswordConfirm = $('#txt-new-password-confirm').val().trim();
            var errMsg = $('#endResetErr');
            errMsg.html("");
            errMsg.removeClass().addClass(invisibleStyle);
            if(newPassword === newPasswordConfirm && newPassword.length > 0 && newPasswordConfirm.length > 0){
                $.ajax({
                    type: 'POST',
                    url: 'http://138.197.130.124/resetPasswordNewPassword.php',
                    data: {
                        emailAddress: emailAddress,
                        newPassword: newPassword
                    },
                    success: function(){
                        console.log("Reset Password successfully");
                        $('#txt-email').val("");
                        $('#token').val("");
                        $('#txt-new-password').val("");
                        $('#txt-new-password-confirm').val("");
                        $.mobile.navigate("#sign-in", {transition: "slide"});
                    },
                    error: function(xhr, ajaxOptions, thrownError){
                        console.log("Error Code: " + xhr.status);
                        console.log("Error Response: " + xhr.responseText);
                        console.log("Thrown Error: " + thrownError);
                        errMsg.html("<p>Invalid login credentials.</p>");
                        errMsg.addClass("bi-ctn-err").slideDown();
                        $('#txt-email').addClass(invalidInputStyle);
                        $('#txt-new-password').addClass(invalidInputStyle);
                        $('#txt-new-password-confirm').addClass(invalidInputStyle);
                    }
                });
            }
        });

        $('#sign-in').on('pageshow', function (e) {
            app.signInController.init();
            app.signInController.$btnSubmit.off("tap").on("tap", function () {
                app.signInController.onSignIn();
            });
        });

        $('#sign-up').on('pageshow', function (e) {
            app.signUpController.init();
            app.signUpController.$Submit.off("tap").on("tap", function () {
                app.signUpController.onSignUp();
            });
        });

        $('#ToSignIn').on('click', function (e) {
            $.mobile.navigate("#sign-in", {transition: "slideup"});
        });

        $('#ToSignUp').on('click', function (e) {
            $.mobile.navigate("#sign-up", {transition: "slideup"});
        });

        $('#GoToSignUp').on('click', function (e) {
           $.mobile.navigate("#sign-up", {transition: "slideup"});
        });

        $('#signed-in').click(function(){
            console.log($('#signed-in').is(':checked'));
            console.log("keep signed in clicked");
        });

        $('#dlg-pwd-reset-sent').click(function(){
            $.mobile.navigate("#sign-in", {transition: "slideup"});
        });

        //Haversine formula
        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);
            var dLon = deg2rad(lon2-lon1);
            var a =
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

        //Lakehead Hangar Gym
        var lakeheadLat = 48.4208004;
        var lakeheadLong = -89.26645730000001;
        var lakeheadVisit = false;
        var lakeheadLogged = false;
        var lakeheadVisitTimeStamp;

        function checkLakehead(){
            //console.log("lastLat: " + lastLat + "lastLong: " + lastLong);
            //console.log(getDistanceFromLatLonInKm(lastLat, lastLong, lakeheadLat, lakeheadLong));
            if(getDistanceFromLatLonInKm(lastLat, lastLong, lakeheadLat, lakeheadLong) <= 0.1){
                alert("In range of Lakehead Hangar");
                if(lakeheadVisit){
                    var currTime = new Date().getTime();
                    var luDuration = (currTime - lakeheadVisitTimeStamp)/1000;
                    if(luDuration >= 10 && !lakeheadLogged){
                        lakeheadLogged = true;
                    }
                }else{
                    lakeheadVisit = true;
                    lakeheadVisitTimeStamp = new Date().getTime();
                }
            }else{
                lakeheadVisit = false;
                if(lakeheadLogged) {
                    var currTime = new Date().getTime();
                    var luDuration = (currTime - lakeheadVisitTimeStamp) / 1000;
                    lakeheadLogged = false;
                    console.log("LOGGED ONCE: Duration (" + luDuration + "s)");
                    alert("Left Lakehead Hangar Duration (" + luDuration + "s)");
                    return luDuration;
                }
                return false;
            }
        }

        //McDonalds Red River Rd
        var mcDonaldsLat = 48.44570969999999;
        var mcDonaldsLong = -89.24873379999997;
        var mcDonaldsVisit = false;
        var mcLogged = false;
        var mcDonaldsVisitTimeStamp;

        function checkMcDonalds(){
            //console.log("lastLat: " + lastLat + "lastLong: " + lastLong);
            //console.log(getDistanceFromLatLonInKm(lastLat, lastLong, mcDonaldsLat, mcDonaldsLong));
            if(getDistanceFromLatLonInKm(lastLat, lastLong, mcDonaldsLat, mcDonaldsLong) <= 0.1){
                alert("In range of McDonalds");
                if(mcDonaldsVisit){
                    var currTime = new Date().getTime();
                    var mcDuration = (currTime - mcDonaldsVisitTimeStamp)/1000;
                    if(mcDuration >= 10 && !mcLogged){
                        mcLogged = true;
                    }
                }else{
                    mcDonaldsVisit = true;
                    mcDonaldsVisitTimeStamp = new Date().getTime();
                }
            }else{
                mcDonaldsVisit = false;
                if(mcLogged){
                    var currTime = new Date().getTime();
                    var mcDuration = (currTime - mcDonaldsVisitTimeStamp)/1000;
                    mcLogged = false;
                    console.log("LOGGED ONCE: Duration ("+mcDuration+"s)");
                    alert("Left McDonalds: Duration ("+mcDuration+"s)");
                    return mcDuration;
                }
                return false;
            }
        }
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
