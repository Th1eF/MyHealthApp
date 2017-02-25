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

        $('#toMain').on('click', function(){
            $("#statsContainer").hide();
            clearGraphs();
        });

        function clearGraphs(){
            $('#visitStats').empty();
            $('#healthStats').empty();
        }

        $('#statsPage').on('pageshow', function(e){
           console.log('page shown');
            $("#statsContainer").show();

            $("#radio-choice-v-6a").click(function(){
               console.log("one week checked");
                $("#timePopContent").popup('close');
                var weekTime = 604800000;
                var currTime = lastTimeStamp;
                var pastTime = currTime - weekTime;
                //datePast, dateCurr
                getData(pastTime, currTime, function(callback){
                    console.log(callback);
                    var avgBPM = callback["Heart Rate"].BPMAvg;
                    var gymVisit = callback["Lakehead Hangar"].totalVisits;
                    var gymDur = callback["Lakehead Hangar"].avgDuration;
                    var mcVisit = callback["McDonalds"].totalVisits;
                    var mcDur = callback["McDonalds"].avgDuration;
                    console.log(avgBPM + " " + gymVisit + " " +  gymDur + " " +  mcVisit + " " +  mcDur);
                    if((mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null) && (gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null)) {
                        var visitStats = [['No Statistics Found', 0]];
                        var healthStats = [['Steps', lastStep], ['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null){
                        var visitStats = [['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null){
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else{
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur], ['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }
                });
            });

            $("#radio-choice-v-6b").click(function(){
                console.log("3 days");
                $("#timePopContent").popup('close');
                var threeDayTime = 259200000;
                var currTime = lastTimeStamp;
                var pastTime = currTime - threeDayTime;
                //datePast, dateCurr
                //var visitStats = [['Gym', 4],['McDonalds', 2]];
                //var healthStats = [['Steps', 500],['Avg BPM', 70]];
                getData(pastTime, currTime, function(callback){
                    console.log(callback);
                    var avgBPM = callback["Heart Rate"].BPMAvg;
                    var gymVisit = callback["Lakehead Hangar"].totalVisits;
                    var gymDur = callback["Lakehead Hangar"].avgDuration;
                    var mcVisit = callback["McDonalds"].totalVisits;
                    var mcDur = callback["McDonalds"].avgDuration;
                    console.log(avgBPM + " " + gymVisit + " " +  gymDur + " " +  mcVisit + " " +  mcDur);
                    if((mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null) && (gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null)) {
                        var visitStats = [['No Statistics Found', 0]];
                        var healthStats = [['Steps', lastStep], ['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null){
                        var visitStats = [['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null){
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else{
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur], ['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }
                });
            });

            $("#radio-choice-v-6c").click(function(){
                console.log("1 day");
                $("#timePopContent").popup('close');
                var dayTime = 86400000;
                var currTime = lastTimeStamp;
                var pastTime = currTime - dayTime;
                //datePast, dateCurr
                getData(pastTime, currTime, function(callback){
                    console.log(callback);
                    var avgBPM = callback["Heart Rate"].BPMAvg;
                    var gymVisit = callback["Lakehead Hangar"].totalVisits;
                    var gymDur = callback["Lakehead Hangar"].avgDuration;
                    var mcVisit = callback["McDonalds"].totalVisits;
                    var mcDur = callback["McDonalds"].avgDuration;
                    console.log(avgBPM + " " + gymVisit + " " +  gymDur + " " +  mcVisit + " " +  mcDur);
                    if((mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null) && (gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null)) {
                        var visitStats = [['No Statistics Found', 0]];
                        var healthStats = [['Steps', lastStep], ['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null){
                        var visitStats = [['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null){
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else{
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur], ['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }
                });
            });

            $("#radio-choice-v-6d").click(function(){
                console.log("one hour");
                $("#timePopContent").popup('close');
                var hourTime = 3600000;
                var currTime = lastTimeStamp;
                var pastTime = currTime - hourTime;
                //datePast, dateCurr
                getData(pastTime, currTime, function(callback){
                    console.log(callback);
                    var avgBPM = callback["Heart Rate"].BPMAvg;
                    var gymVisit = callback["Lakehead Hangar"].totalVisits;
                    var gymDur = callback["Lakehead Hangar"].avgDuration;
                    var mcVisit = callback["McDonalds"].totalVisits;
                    var mcDur = callback["McDonalds"].avgDuration;
                    console.log(avgBPM + " " + gymVisit + " " +  gymDur + " " +  mcVisit + " " +  mcDur);
                    if((mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null) && (gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null)) {
                        var visitStats = [['No Statistics Found', 0]];
                        var healthStats = [['Steps', lastStep], ['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(gymVisit == 0 || gymVisit == null || gymDur == 0 || gymDur == null){
                        var visitStats = [['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else if(mcVisit == 0 || mcVisit == null || mcDur == 0 || mcDur == null){
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }else{
                        var visitStats = [['Lakehead Hangar', gymVisit], ['Gym Avg(s)', gymDur], ['McDonalds', mcVisit], ['McD Avg(s)', mcDur]];
                        var healthStats = [['Steps', lastStep],['Avg BPM', avgBPM]];
                        createGraphs(visitStats, healthStats);
                    }
                });
            });

            function createGraphs(visitStats, healthStats){
                clearGraphs();

                $('#visitStats').jqplot([visitStats], {
                    animate: !$.jqplot.use_excanvas,
                    title:'Visit Stats',
                    seriesDefaults:{
                        renderer:$.jqplot.BarRenderer,
                        pointLabels: {show: true},
                        rendererOptions:{
                            varyBarColor: true
                        }
                    },
                    axes:{
                        xaxis:{
                            renderer: $.jqplot.CategoryAxisRenderer
                        }
                    }
                });

                $('#healthStats').jqplot([healthStats], {
                    animate: !$.jqplot.use_excanvas,
                    title:'Health Stats',
                    seriesDefaults:{
                        renderer:$.jqplot.BarRenderer,
                        pointLabels: {show: true},
                        rendererOptions:{
                            varyBarColor: true
                        }
                    },
                    axes:{
                        xaxis:{
                            renderer: $.jqplot.CategoryAxisRenderer
                        }
                    }
                });
            }
        });


        $(document).on("pagecontainerbeforeshow", function (event, ui) {
            if (typeof ui.toPage == "object") {
                switch (ui.toPage.attr("id")) {
                    case "page-signup":
                        app.signUpController.resetSignUp();
                        break;

                    case "page-signin":
                        app.signInController.resetSignIn();
                        break;
                }
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

        //-----------------------------------------------------------------------
        //Pedometer
        var lastTimeStamp = new Date().getTime();
        var lastLat;
        var lastLong;
        var lastSpeed;
        var lastStep;

        var totalSteps = 0;
        if(window.localStorage != undefined){
            var localSteps = parseInt(window.localStorage.getItem("Steps"));
            if(!isNaN(localSteps)){
                totalSteps = localSteps;
            }

            $('#steps').text("Steps: " + totalSteps);
        }

        var pedometerSuccess = function (pedometerData) {
            /*console.log(
                'Start Date: ' + pedometerData.startDate + '\n' +
                'End Date: ' + pedometerData.endDate + '\n' +
                '# of Steps: ' + pedometerData.numberOfSteps + '\n'
                /*'Distance: ' + pedometerData.distance + '\n' +
                'Floors Ascended: ' + pedometerData.floorsAscended + '\n' +
                'Floors Descended: ' + pedometerData.floorsDescended + '\n')*/

            if(window.localStorage != undefined){
                var updatedSteps = totalSteps+pedometerData.numberOfSteps;
                window.localStorage.setItem("Steps", updatedSteps);
                lastStep = updatedSteps;
                $('#steps').text("Steps: " + updatedSteps);
            }
        };

        pedometer.isStepCountingAvailable(function(){
            console.log( "Pedometer step counting is available" );
        }, function(){
            console.log( "Pedometer step counting is NOT available" );
        });

        var pedometerError = function(error){
            console.log('error: ' + error)
        };
        pedometer.startPedometerUpdates(pedometerSuccess, pedometerError);
        //Pedometer
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        //Geolocation
        var geoSuccess = function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var speed = position.coords.speed;
            lastLat = latitude;
            lastLong = longitude;
            lastSpeed = speed;
            lastTimeStamp = position.timestamp;
            $('#lat').text("Latitude: " + latitude);
            $('#long').text("Longitude: " + longitude);
            $('#speed').text("Speed: " + speed + " m/s");
            /*console.log('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');*/
        };

        function geoError(error) {
            console.log('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

        var geoOptions = {
            maximumAge: 3600000,
            timeout: 1000,
            enableHighAccuracy: true
        };

        navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
        //Geolocation
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        //Heart Beat
        $('#measureBPM').on('click', function(){
            function heartSuccess(bpm){
                $('#heartRate').text('Heart Rate: ' + bpm);

                /*uploadData(lastTimeStamp, lastLat, lastLong, lastSpeed, lastStep, bpm, "", "", function(callback){
                   console.log(callback);
                });*/
            }

            function heartError(){
                alert("Not possible to measure your heart rate");
            }

            var heartOptions = {
                seconds: 10,
                fps: 30
            };

            heartbeat.take(heartOptions, heartSuccess, heartError);
        });

        //Send data to cloud database
        /*function uploadData(timestamp, latitude, longitude, speed, steps, bpm, visit, duration, callback){
            $.ajax({
                type: 'POST',
                url: 'http://138.197.130.124/uploadData.php',
                data: {
                    timestamp: timestamp,
                    latitude: latitude,
                    longitude: longitude,
                    speed: speed,
                    steps: steps,
                    bpm: bpm,
                    visit: visit,
                    duration: duration
                },
                success: callback,
                error: function(xhr, ajaxOptions, thrownError){
                    console.log("Error Code: " + xhr.status);
                    console.log("Error Response: " + xhr.responseText);
                    console.log("Thrown Error: " + thrownError);
                    callback(false);
                }
            });
        }*/

        //Get data from cloud database
        function getData(datePast, dateCurr, callback) {
            $.ajax({
                type: 'GET',
                url: 'http://138.197.130.124/getData.php',
                data: {
                    datePast: datePast,
                    dateCurr: dateCurr
                },
                dataType: 'json',
                success: callback,
                error: function(xhr, ajaxOptions, thrownError){
                    console.log("Error Code: " + xhr.status);
                    console.log("Error Response: " + xhr.responseText);
                    console.log("Thrown Error: " + thrownError);
                    callback(false);
                }
            });
        }


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
        /*
        window.setInterval(function(){
            var mcTime = checkMcDonalds();
            var lakeheadTime = checkLakehead();
            if(mcTime){
                uploadData(lastTimeStamp, lastLat, lastLong, lastSpeed, lastStep, "", "McDonalds", mcTime, function(callback){
                 console.log(callback);
                 });
                console.log(mcTime)
            }
            if(lakeheadTime){
                uploadData(lastTimeStamp, lastLat, lastLong, lastSpeed, lastStep, "", "Lakehead Hangar", lakeheadTime, function(callback){
                    console.log(callback);
                });
            }

            uploadData(lastTimeStamp, lastLat, lastLong, lastSpeed, lastStep, "", "", "", function(callback){
                console.log(callback);
            });
        }, 1000)*/
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
