let stack = [];
let lastEntry = null;


function emptyStack(){
    stack = [];
}
function registerNewEntry(val,date){
    
    if(stack.length > 19){
        stack = stack.slice(1);
    }
    lastEntry = date;
    stack.push({ soc: val.batterystatus.currentSOC_pct, time: date});
}
function enterNewConsumption(newstate){
    
    let newDate = new Date(newstate.whenhappend)
    if(lastEntry != null && newDate.getTime()-lastEntry.getTime() > (60000*20)){
        emptyStack();
    }
    registerNewEntry(newstate,newDate);
    
}
function getConsumption(){

    if(stack.length > 1){
      return((stack[0].soc-stack[stack.length-1])/
        (stack[stack.length-1].time.getTime()-stack[0].time.getTime()))*60000;
    }
    else return 0;
}

module.exports = {
    enterNewConsumption,
    getConsumption
}