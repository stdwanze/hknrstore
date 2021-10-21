const fs = require('fs');

let uicontent = null;

function getui(){

    if(uicontent != null) return uicontent;
    else return "<html><body>NONE LOADED</body></html>";
}
function loadui(config){

    if(uicontent == null){

       uicontent = fs.readFileSync(config.uiPath+"/"+config.uiFiles[0], 'utf8');
    }

}

module.exports = {
    getui, loadui
}