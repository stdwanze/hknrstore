
const { queryContainer, upSert} = require('./db');
const { guestimateDriveStatus } = require('./cache');
const { toJSTime } = require('./utils');


const hours = 5 * 24 ;
queryContainer(hours).then((r)=> {
    console.log(r.length + " results loaded");
    var changed = 0;
    var chargebattery = 0;
    var chargeplug = 0;
    var batteryplug = 0;
    var runResults = [];
    r.forEach((s)=>{

        var chargeDate = toJSTime(s.chargingstatus.carCapturedTimestamp);
        var batteryDate = toJSTime(s.batterystatus.carCapturedTimestamp);
        var plugDate = toJSTime(s.plugstatus.carCapturedTimestamp);


        var diff = chargeDate.getTime() - plugDate.getTime();
        if(diff  != 0 ){
            runResults.push(diff/(1000));
        }



    });
    runResults.sort(function(a, b) {
        return a - b;
      });
   // runResults = runResults.sort();
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
   var avg = 0;
    for( var i = 0; i < runResults.length; i++){
        avg += runResults[i];
    }
    avg = avg / runResults.length;


    console.log("%s 0, %s median , %s highest ",runResults[0], runResults[ Math.floor(runResults.length/2) ], runResults[runResults.length-10]);
  console.log("%s median, %s 60s , %s 70s , %s 75th", runResults[ Math.floor(runResults.length/2) ], runResults[Math.floor(runResults.length/10*6.5)],runResults[Math.floor(runResults.length/10)*7],runResults[Math.floor(runResults.length/4)*3] );



    var breaking = runResults.slice(Math.floor(runResults.length/10*5.5),Math.floor(runResults.length/10*6.5));
    console.log(breaking);

});

