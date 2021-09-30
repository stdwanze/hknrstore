


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
                wakeUpListener(state);
            }
        }
    }

}
function consume(statetoSet){
    checkForWakeUp(statetoSet);
    if(isNew(statetoSet))
    {
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