
const { queryContainer, upSert} = require('./db');
const { guestimateDriveStatus } = require('./cache');



const hours = 3 * 24 ;
queryContainer(hours).then((r)=> {
    console.log(r.length + " results loaded");
    var changed = 0;
    r.forEach((s)=>{
        if(s.state == "moving" && s.plugstatus.plugConnectionState == "connected")
        {
            s.state = "charging"
            changed++
        }
        upSert(s);

    });

    console.log(changed + " will be changed");


});

