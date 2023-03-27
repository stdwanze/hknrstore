
const fs = require('fs');


function savelastvalueWn(val,valname){

    try {
        fs.writeFileSync(valname+".json",JSON.stringify(val));
    } catch (error) {
        console.error(error);
    }

}
function savelastvalue(){
    return savelastvalueWn("lastvalue");
}
function getlastvalue(){
     return getlastvalueWn("lastvalue");
}
function getlastvalueWn(valname){

    try {
        var content = fs.readFileSync(valname+".json");
        var jsobj = JSON.parse(content);
        return jsobj;
    } catch (error) {
        console.error(error);
        return {}
    }
}


module.exports = {
    savelastvalue,
    getlastvalue,
    savelastvalueWn,
    getlastvalueWn
}