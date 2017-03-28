var generateGraphs = (function(){
    var init = function(){
        $('#statsPage').on('pagebeforehide', function(){
            console.log("stats page hidden");
            $("#statsContainer").hide();
            clearGraphs();
        });

        $('#locationsPage').on('pagebeforehide', function(){
            console.log("location page hidden");
            $("#locationContainer").hide();
            clearGraphs();
        });

        $('#locationsPage').on('pagebeforeshow', function(){
            console.log('location page shown');

            getLocations(function(callback){
                console.log(callback);
                var ticks = [];
                var locationDur = [];
                var locationCount = [];
                $.each(callback, function(key, value){
                    $.each(value, function(locationName, obj){
                        ticks.push(locationName);
                        locationDur.push(obj["avgDuration"]);
                        locationCount.push(obj["totalVisits"]);
                    });
                });
                console.log(ticks);
                console.log(locationDur);
                console.log(locationCount);
                createLocationGraph(ticks, locationDur, locationCount);
            });
            $("#locationContainer").show();
        });

        $('#statsPage').on('pagebeforeshow', function(){
            console.log('stats page shown');
            console.log("1 day");
            $("#timePopContent").popup('close');
            var dayTime = 86400000;
            var currTime = new Date().getTime();
            console.log(currTime);
            var pastTime = currTime - dayTime;
            getData(pastTime, "http://138.197.130.124/getDataDay.php", function(callback){
                console.log(callback);
                var stepsStats = [];
                var totalSteps = 0;
                $.each(callback, function(key, value){
                    totalSteps += value;

                    stepsStats.push([key, value]);
                });
                console.log(stepsStats);

                getSteps(function(goalSteps){
                    console.log(goalSteps);
                    createGraph(stepsStats, totalSteps, goalSteps);
                });
            });

            getBPMData(pastTime, "http://138.197.130.124/getBPMDay.php", function(callback){
                console.log(callback);
                var bpmStats = [];
                var bpmArray = [];
                var totalBPM = 0;
                var validBPM = 0;
                $.each(callback, function(key, value){
                    if(value > 0){
                        bpmArray.push(value);
                        validBPM++;
                    }else{
                        value = 0;
                    }
                    totalBPM += value;
                    bpmStats.push([key, value]);
                });
                console.log(bpmStats);
                var avgBPM = "N/A";
                if(validBPM > 0){
                    avgBPM = totalBPM / validBPM;
                }
                var minBPM = Math.min.apply(null, bpmArray);
                var maxBPM = Math.max.apply(null, bpmArray);

                createBPMGraph(bpmStats, avgBPM, minBPM, maxBPM);
            });

            $("#statsContainer").show();
        });

        function clearGraphs(){
            console.log("clearing graphs");
            $('#stepsStats').empty();
            $('#locationStats').empty();
            $('#bpmStats').empty();
        }

        $("#radio-choice-v-6a").click(function(){
            clearGraphs();
            console.log("1 day");
            $("#timePopContent").popup('close');
            var dayTime = 86400000;
            var currTime = new Date().getTime();
            console.log(currTime);
            var pastTime = currTime - dayTime;
            getData(pastTime, "http://138.197.130.124/getDataDay.php", function(callback){
                console.log(callback);
                var stepsStats = [];
                var totalSteps = 0;
                $.each(callback, function(key, value){
                    totalSteps += value;
                    stepsStats.push([key, value]);
                });
                console.log(stepsStats);

                getSteps(function(goalSteps){
                    console.log(goalSteps);
                    createGraph(stepsStats, totalSteps, goalSteps);
                });
            });

            getBPMData(pastTime, "http://138.197.130.124/getBPMDay.php", function(callback){
                console.log(callback);
                var bpmStats = [];
                var bpmArray = [];
                var totalBPM = 0;
                var validBPM = 0;
                $.each(callback, function(key, value){
                    if(value > 0){
                        bpmArray.push(value);
                        validBPM++;
                    }else{
                        value = 0;
                    }
                    totalBPM += value;
                    bpmStats.push([key, value]);
                });
                console.log(bpmStats);
                var avgBPM = "N/A";
                if(validBPM > 0){
                    avgBPM = totalBPM / validBPM;
                }
                var minBPM = Math.min.apply(null, bpmArray);
                var maxBPM = Math.max.apply(null, bpmArray);

                createBPMGraph(bpmStats, avgBPM, minBPM, maxBPM);
            });
        });

        $("#radio-choice-v-6b").click(function(){
            clearGraphs();
            console.log("3 days");
            $("#timePopContent").popup('close');
            var threeDayTime = 259200000;
            var currTime = new Date().getTime();
            var pastTime = currTime - threeDayTime;

            getData(pastTime, "http://138.197.130.124/getDataThreeDays.php", function(callback){
                console.log(callback);
                var stepsStats = [];
                var totalSteps = 0;
                $.each(callback, function(key, value){
                    totalSteps += value;
                    stepsStats.push([key, value]);
                });
                console.log(stepsStats);

                getSteps(function(goalSteps){
                    console.log(goalSteps);
                    createGraph(stepsStats, totalSteps, goalSteps);
                });
            });

            getBPMData(pastTime, "http://138.197.130.124/getBPMThreeDays.php", function(callback){
                console.log(callback);
                var bpmStats = [];
                var bpmArray = [];
                var totalBPM = 0;
                var validBPM = 0;
                $.each(callback, function(key, value){
                    if(value > 0){
                        bpmArray.push(value);
                        validBPM++;
                    }else{
                        value = 0;
                    }
                    totalBPM += value;
                    bpmStats.push([key, value]);
                });
                console.log(bpmStats);
                var avgBPM = "N/A";
                if(validBPM > 0){
                    avgBPM = totalBPM / validBPM;
                }
                var minBPM = Math.min.apply(null, bpmArray);
                var maxBPM = Math.max.apply(null, bpmArray);

                createBPMGraph(bpmStats, avgBPM, minBPM, maxBPM);
            });
        });


        //TODO FINISH GENERATING GRAPH HOUR BY HOUR BREAK DOWN
        $("#radio-choice-v-6c").click(function(){
            clearGraphs();
            console.log("one week checked");
            $("#timePopContent").popup('close');
            var weekTime = 604800000;
            var currTime = new Date().getTime();
            var pastTime = currTime - weekTime;

            getData(pastTime, "http://138.197.130.124/getDataWeek.php", function(callback){
                console.log(callback);
                var stepsStats = [];
                var totalSteps = 0;
                $.each(callback, function(key, value){
                    totalSteps += value;
                    stepsStats.push([key, value]);
                });
                console.log(stepsStats);

                getSteps(function(goalSteps){
                    console.log(goalSteps);
                    createGraph(stepsStats, totalSteps, goalSteps);
                });
            });

            getBPMData(pastTime, "http://138.197.130.124/getBPMWeek.php", function(callback){
                console.log(callback);
                var bpmStats = [];
                var bpmArray = [];
                var totalBPM = 0;
                var validBPM = 0;
                $.each(callback, function(key, value){
                    if(value > 0){
                        bpmArray.push(value);
                        validBPM++;
                    }else{
                        value = 0;
                    }
                    totalBPM += value;
                    bpmStats.push([key, value]);
                });
                console.log(bpmStats);
                var avgBPM = "N/A";
                if(validBPM > 0){
                    avgBPM = totalBPM / validBPM;
                }
                var minBPM = Math.min.apply(null, bpmArray);
                var maxBPM = Math.max.apply(null, bpmArray);

                createBPMGraph(bpmStats, avgBPM, minBPM, maxBPM);
            });
        });

        $("#radio-choice-v-6d").click(function(){
            clearGraphs();
            console.log("one week checked");
            $("#timePopContent").popup('close');
            var twoWeekTime = 1209600000;
            var currTime = new Date().getTime();
            var pastTime = currTime - twoWeekTime;
            getData(pastTime, "http://138.197.130.124/getDataTwoWeeks.php", function(callback){
                console.log(callback);
                var stepsStats = [];
                var totalSteps = 0;
                $.each(callback, function(key, value){
                    totalSteps += value;
                    stepsStats.push([key, value]);
                });
                console.log(stepsStats);

                getSteps(function(goalSteps){
                    console.log(goalSteps);
                    createGraph(stepsStats, totalSteps, goalSteps);
                });
            });

            getBPMData(pastTime, "http://138.197.130.124/getBPMTwoWeeks.php", function(callback){
                console.log(callback);
                var bpmStats = [];
                var bpmArray = [];
                var totalBPM = 0;
                var validBPM = 0;
                $.each(callback, function(key, value){
                    if(value > 0){
                        bpmArray.push(value);
                        validBPM++;
                    }else{
                        value = 0;
                    }
                    totalBPM += value;
                    bpmStats.push([key, value]);
                });
                console.log(bpmStats);
                var avgBPM = "N/A";
                if(validBPM > 0){
                    avgBPM = totalBPM / validBPM;
                }
                var minBPM = Math.min.apply(null, bpmArray);
                var maxBPM = Math.max.apply(null, bpmArray);

                createBPMGraph(bpmStats, avgBPM, minBPM, maxBPM);
            });
        });


        function createGraph(stepsStats, totalSteps, goalSteps){

            //TODO LOOK INTO WHY X AND Y AXIS APPEAR BLURRY
            $('#stepsStats').jqplot([stepsStats], {
                animate: !$.jqplot.use_excanvas,
                title:'Steps: ' + totalSteps + ' / ' + goalSteps + '     Calories: ' + Math.round(totalSteps*0.044),
                seriesDefaults:{
                    renderer:$.jqplot.BarRenderer,
                    pointLabels: {show: true},
                    rendererOptions:{
                        varyBarColor: true
                    }
                },
                axesDefaults: {
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                    tickOptions: {
                        angle: -90,
                        fontSize: '8pt',
                        formatString: '%d'
                    }
                },
                axes:{
                    xaxis:{
                        renderer: $.jqplot.CategoryAxisRenderer
                    }
                }
            });
        }

        function createBPMGraph(bpmStats, avgBPM, minBPM, maxBPM){
            $('#bpmStats').jqplot([bpmStats], {
                animate: !$.jqplot.use_excanvas,
                title:'Peak Min: ' + minBPM + ' Peak Max: ' + maxBPM + ' Avg: ' + avgBPM,
                seriesColors:['#fb0322'],
                seriesDefaults:{
                    renderer:$.jqplot.BarRenderer,
                    pointLabels: {show: true},
                    rendererOptions:{
                        varyBarColor: true
                    }
                },
                axesDefaults: {
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                    tickOptions: {
                        angle: -90,
                        fontSize: '8pt',
                        formatString: '%d'
                    }
                },
                axes:{
                    xaxis:{
                        renderer: $.jqplot.CategoryAxisRenderer
                    }
                }
            });
        }

        function createLocationGraph(ticks, locationDur, locationCount){
            clearGraphs();
            $('#locationStats').jqplot([locationDur, locationCount], {
                animate: !$.jqplot.use_excanvas,
                title:'Location History',
                seriesColors:['#00749F', '#73C774'],
                seriesDefaults:{
                    renderer:$.jqplot.BarRenderer,
                    pointLabels: {
                        show: true,
                    },
                    rendererOptions:{
                        varyBarColor: false
                    }
                },
                legend:{
                    show: true,
                    //placement: 'outsideGrid',
                    renderer: $.jqplot.EnhancedLegendRenderer,
                    rendererOptions: {
                        numberColumns: 1,
                    },
                    location: 'ne',
                    labels: ['Avg Time(s)', 'Total Visits']
                },
                axesDefaults: {
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                    tickOptions: {
                        angle: -90,
                        fontSize: '8pt'
                    }
                },
                axes:{
                    xaxis:{
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: ticks,
                    }
                },
            });
        }

        function getLocations(callback){
            $.ajax({
                type: 'GET',
                url: "http://138.197.130.124/getLocations.php",
                data: {
                    auth: Config.authToken
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

        function getSteps(callback){
            $.ajax({
                type: 'GET',
                url: "http://138.197.130.124/getSteps.php",
                data: {
                    auth: Config.authToken
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

        function getBPMData(datePast, url, callback){
            $.ajax({
                type: 'GET',
                url: url,
                data: {
                    datePast: datePast,
                    auth: Config.authToken
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

        function getData(datePast, url, callback){
            $.ajax({
                type: 'GET',
                url: url,
                data: {
                    datePast: datePast,
                    auth: Config.authToken
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
    };

    return{init: init}

})();


