const { toJSTime} = require("./utils");


var lastValue = null;
var wakeUpListener = null;
function isNotCharging(statetoSet){
    if(statetoSet.state == "charging" ||
     statetoSet.plugstatus.plugConnectionState != "disconnected") return false;
    return true;
}

function isNew(statetoSet){

    if(lastValue == null){
        return true;
    }
    else if( statetoSet.state == lastValue.state && statetoSet.whenhappend == lastValue.whenhappend && isNotCharging(statetoSet)){
        return false;
    }

    return true;
}
function setLastValue(s){
    lastValue = s;
}

function check(predicate,state,message){
    if(lastValue != null){
        if( predicate())
            if(wakeUpListener != null){
                wakeUpListener(state,message);
            }
        }
    }


function checkForWakeUp(state){
    check(()=> (state.time-lastValue.time) / 60000 > 10,state,"WakeUp - "+state.batterystatus.currentSOC_pct+"%");
}
function checkForChargeEnd(state){
    check(()=> isNotCharging(state) && !isNotCharging(lastValue),state,"ChargeEnd - "+state.batterystatus.currentSOC_pct+"%");

}

function checkForMoving(state){
    check(()=>  lastValue.state != "moving" && state.state == "moving",state,"Moving - "+state.batterystatus.currentSOC_pct+"%");

}

function checkForParked(state){
    check(()=>  lastValue.state == "moving" && state.state != "parked",state,"Parked - "+state.batterystatus.currentSOC_pct+"%");

}

function guestimateDriveStatus(state){


    try{
        if(isNotCharging(state)){
            var base = toJSTime(state.chargingstatus.carCapturedTimestamp);
            var plugstate = toJSTime(state.plugstatus.carCapturedTimestamp);

            if((base-plugstate) / (1000*60) > 2) // bigger 2 minutes
            {
                state.state = "moving";
            }
        }

    }
    catch(e){
        console.error(e);
    }
    return state;
}
function consume(statetoSet){
    checkForWakeUp(statetoSet);
    checkForChargeEnd(statetoSet);
    if(isNew(statetoSet))
    {
        statetoSet = guestimateDriveStatus(statetoSet);
        checkForMoving(statetoSet);
        checkForParked(statetoSet);
        lastValue = statetoSet;
        return statetoSet;
    }
    else return null;
}
function addWakeUpListener(listener){
    wakeUpListener = listener;
}
module.exports = {
    consume,
    addWakeUpListener,
    guestimateDriveStatus,
    setLastValue,
    checkForChargeEnd,
    checkForMoving,
    checkForParked,
    checkForWakeUp

}