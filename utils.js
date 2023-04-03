const moment = require('moment');

function toCosmosTime(date){
    return moment(new Date(date)).utc().format("yyyy-MM-DDTHH:mm:ss.SSSSSSS")+"Z";
}

function toJSTime(datestring){
    return new Date(datestring);
}

function substract(date,amount,mod){

    let multiplier = 1000;
    switch(mod){
        case "d": multiplier = multiplier*60*60*24; break;
        case "h": multiplier = multiplier*60*60; break;
        case "m": multiplier = multiplier*60; break;
        default:   
    }
    let millis = amount * multiplier;
    return new Date(date.getTime()-millis);

}

//2014-09-15T23:14:25.7251173Z
//2021-07-TuT14:06:58.fffffff+02:00'


module.exports ={
    toCosmosTime,
    toJSTime,
    substract
}