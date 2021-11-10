
const { queryContainer, upSert} = require('./db');
const c = require('./cache');
const { toJSTime } = require('./utils');


const hours = 1 * 24 ;
queryContainer(hours).then((r)=> {
    console.log(r.length + " results loaded");
    var changed = 0;
    var chargebattery = 0;
    var chargeplug = 0;
    var batteryplug = 0;
    var runResults = [];
    var cleaned = [];

    c.addWakeUpListener((s)=>{
       runResults.push({ state: s.state, t: s.whenhappend });
    });

    r.forEach((s) =>{
        if(s.state != "charging" ) s.state = "parked";
       cleaned.push(s);
    });
    cleaned.forEach((s)=>{

        s =c.guestimateDriveStatus(s);
        c.checkForMoving(s);
        c.checkForParked(s);


        c.setLastValue(s);
    });

    console.log(runResults);

});

