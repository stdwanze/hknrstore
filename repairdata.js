
const { queryContainer, upSert} = require('./db');
const { guestimateDriveStatus } = require('./cache');



const hours = 200 * 24 ;
queryContainer(hours).then((r)=> {
    console.log(r.length + " results loaded");
    var changed = 0;
    r.forEach((s)=>{
        var oldstate = s.state;
        s = guestimateDriveStatus(s);
        if(oldstate != "moving" && s.state == "moving"){
            changed++;
         //   upSert(s);
        }
    });

    console.log(changed + " will be changed");


});

