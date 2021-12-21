const { toJSTime} = require("./utils");


var lastValue = null;
var wakeUpListener = null;
function isNotCharging(statetoSet){
    if(statetoSet.state == "charging" ||
     statetoSet.plugstatus.plugConnectionState != "disconnected") return false;
    return true;
}
function climateIsOn(state){
    if(state.climatestatus.climatisationState != "off") return true;
    else return false;

}
function isNotChargingForIsNew(statetoSet){
    if(statetoSet.state == "charging" ) return false;
    return true;
}

function isNew(statetoSet){

    if(lastValue == null){
        return true;
    }
    else if( statetoSet.whenhappend == lastValue.whenhappend){
        if(statetoSet.climatestatus.climatisationState != lastValue.climatestatus.climatisationState ){
            return true;
        }

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
    check(()=> isNotChargingForIsNew(state) && ((state.time-lastValue.time) / 60000 > 10),state,"WakeUp - "+state.batterystatus.currentSOC_pct+"%");
}
function checkForChargeEnd(state){
    check(()=> isNotChargingForIsNew(state) && !isNotChargingForIsNew(lastValue),state,"ChargeEnd - "+state.batterystatus.currentSOC_pct+"%");
}
function checkForChargeStart(state){
    check(()=> !isNotChargingForIsNew(state) && isNotChargingForIsNew(lastValue),state,"ChargeStart - "+state.batterystatus.currentSOC_pct+"%");
}
function checkForMoving(state){
    check(()=>  lastValue.state != "moving" && state.state == "moving",state,"Moving - "+state.batterystatus.currentSOC_pct+"%");
}
function checkForParked(state){
    check(()=>  lastValue.state == "moving" && state.state == "parked",state,"Parked - "+state.batterystatus.currentSOC_pct+"%");
}

function guestimateDriveStatus(state){


    try{
        if(isNotCharging(state)){
            var base = toJSTime(state.chargingstatus.carCapturedTimestamp);
            var plugstate = toJSTime(state.plugstatus.carCapturedTimestamp);

            if((base-plugstate) / (1000) > 120) // bigger 20 seconds
            {
                if(!climateIsOn(state)) {
                    state.state = "moving";
                }
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
    checkForChargeStart(statetoSet);
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
    checkForChargeStart,
    checkForMoving,
    checkForParked,
    checkForWakeUp,
    isNew

}