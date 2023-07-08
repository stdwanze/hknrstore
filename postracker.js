
function extract(val){
    let ret = null;
    let pos = val.position;
    if(pos != null){
        ret = { json : pos, csv : pos.lat + "," +pos.lon + ","+pos.carCapturedTimestamp}
    }
    return ret;
}

function handlePos (val,oldstack){

    if(!(oldstack instanceof Array)) oldstack = [];
    let newVal = extract(val);
    if(newVal != null){
        oldstack.push(newVal);
    }
    return oldstack;   
}

module.exports = {
    handlePos
}