var generateGraphs = (function(){
    $('#toMain').on('click', function(){
        $("#statsContainer").hide();
        clearGraphs();
    });

    $('#statsPage').on('pagehide', function(){
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
    });
});