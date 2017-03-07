var sensorData = (function(){
    var init = function(){
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
            console.log(latitude);
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
                upload(lastTimeStamp, lastLat, lastLong, lastSpeed, lastStep, bpm, "", "");
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

         window.setInterval(function(){
             upload(lastTimeStamp, lastLat, lastLong, lastSpeed, lastStep, "", "", "");
         }, 5000)
    };

    var upload = function(timestamp, latitude, longitude, speed, steps, bpm, visit, duration){
        if(Config.loggedIn && Config.uploadData){
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
                    duration: duration,
                    auth: Config.authToken
                },
                success: function(){
                    console.log("data uploaded successfully")
                },
                error: function(xhr, ajaxOptions, thrownError){
                    console.log("Error Code: " + xhr.status);
                    console.log("Error Response: " + xhr.responseText);
                    console.log("Thrown Error: " + thrownError);
                }
            });
        }else{
            console.log("Not uploading Data [loggedIn] = " + Config.loggedIn + " , [uploadData] = " + Config.uploadData);
        }
    };

    return {init: init}
})();