
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
        if(oldstack.length > 0){ 
            let last = oldstack[oldstack.length-1];
            if(last.json.carCapturedTimestamp != newVal.json.carCapturedTimestamp){
                oldstack.push(newVal);
            }
        }else
        oldstack.push(newVal);
    }
    return oldstack;   
}

module.exports = {
    handlePos
}