
var lastValue = null;

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

function consume(statetoSet){
    if(isNew(statetoSet))
    {
        lastValue = statetoSet;
        return statetoSet;
    }
    else return null;
}

module.exports = {
    consume
}