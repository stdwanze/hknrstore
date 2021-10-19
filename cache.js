const { toJSTime} = require("./utils");


var lastValue = null;
var wakeUpListener = null;
function isNotCharging(statetoSet){
    if(statetoSet.state == "charging") return false;
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
function checkForWakeUp(state){

    if(lastValue != null){
        if( (state.time-lastValue.time) / 60000 > 10 ) { // if 10 minutes passed
            if(wakeUpListener != null){
                wakeUpListener(state,"WakeUp");
            }
        }
    }

}
function checkForChargeEnd(state){
    if(lastValue != null){
        if( isNotCharging(state) && !isNotCharging(lastValue) ) { //last WasCharging and now end
            if(wakeUpListener != null){
                wakeUpListener(state,"ChargeEnd");
            }
        }
    }
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
        lastValue = statetoSet;
        return statetoSet;
    }
    else return null;
}
function addWakeUpListener(listener){
    wakeUpListener = listener;
}
module.exports = {
    consume, addWakeUpListener
}