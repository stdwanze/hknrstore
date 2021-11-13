
const fs = require('fs');


function savelastvalue(val){

    try {
        fs.writeFileSync("lastvalue.json",JSON.stringify(val));
    } catch (error) {
        console.error(error);
    }

}
function getlastvalue(){

    try {
        var content = fs.readFileSync("lastvalue.json");
        var jsobj = JSON.parse(content);
        return jsobj;
    } catch (error) {
        console.error(error);
        return {}
    }
}


module.exports = {
    savelastvalue,
    getlastvalue
}