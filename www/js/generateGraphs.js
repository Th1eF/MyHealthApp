var generateGraphs = (function(){
    var init = function(){
        $('#statsPage').on('pagebeforehide', function(){
            console.log("stats page hidden");
            $("#statsContainer").hide();
            clearGraphs();
        });

        $('#statsPage').on('pagebeforeshow', function(){
            console.log('stats page shown');
            $("#statsContainer").show();
        });

        function clearGraphs(){
            $('#stepsStats').empty();
            $('#visitStats').empty();
            $('#healthStats').empty();
        }

        $("#radio-choice-v-6a").click(function(){
            console.log("one week checked");
            $("#timePopContent").popup('close');
            var weekTime = 604800000;
            var currTime = new Date().getTime();
            var pastTime = currTime - weekTime;
        });

        $("#radio-choice-v-6b").click(function(){
            console.log("3 days");
            $("#timePopContent").popup('close');
            var threeDayTime = 259200000;
            var currTime = new Date().getTime();
            var pastTime = currTime - threeDayTime;
        });


        //TODO FINISH GENERATING GRAPH HOUR BY HOUR BREAK DOWN
        $("#radio-choice-v-6c").click(function(){
            console.log("1 day");
            $("#timePopContent").popup('close');
            var dayTime = 86400000;
            var currTime = new Date().getTime();
            console.log(currTime);
            var pastTime = currTime - dayTime;
            getDataDay(pastTime, currTime, function(callback){
                console.log(callback);
                var stepsStats = [];
                var totalSteps = 0;
                $.each(callback, function(key, value){
                    totalSteps += value;
                   stepsStats.push([key, value]);
                });
                console.log(stepsStats);

                createDayGraphs(stepsStats, totalSteps);
            });
        });

        $("#radio-choice-v-6d").click(function(){
            console.log("one hour");
            $("#timePopContent").popup('close');
            var hourTime = 3600000;
            var currTime = new Date().getTime();
            var pastTime = currTime - hourTime;
        });


        function createDayGraphs(stepsStats, totalSteps){
            clearGraphs();

            //TODO LOOK INTO WHY X AND Y AXIS APPEAR BLURRY
            $('#stepsStats').jqplot([stepsStats], {
                animate: !$.jqplot.use_excanvas,
                title:'Steps: ' + totalSteps,
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
                        fontSize: '8pt'
                    }
                },
                axes:{
                    xaxis:{
                        renderer: $.jqplot.CategoryAxisRenderer
                    }
                }
            });
        }

        function getDataDay(datePast, dateCurr, callback){
            $.ajax({
                type: 'GET',
                url: 'http://138.197.130.124/getDataDay.php',
                data: {
                    datePast: datePast,
                    dateCurr: dateCurr,
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


