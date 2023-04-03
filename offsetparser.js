
let mdres = "d";
let digitres = 0;


function setupOffset(input){

    let digit = /\d+/g;
    let modifier = /[dms]/g;
    
    let md = input.match(digit);
    let mod = input.match(modifier);

    if(md.length > 0) digitres = md[0];
    if(mod.length > 0) mdres = mod[0];
    
}

function getMod(){
    return mdres;
}
function getDigit(){
    return digitres;
}

module.exports ={
    getMod,
    getDigit,
    setupOffset
}