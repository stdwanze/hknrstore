const moment = require('moment');

function toCosmosTime(date){
    return moment(new Date(date)).utc().format("yyyy-MM-DDTHH:mm:ss.SSSSSSS")+"Z";
}

//2014-09-15T23:14:25.7251173Z
//2021-07-TuT14:06:58.fffffff+02:00'


module.exports ={
    toCosmosTime
}