
let mdres = "d";
let digitres = 0;


function setupOffset(input){

    let digits = /\d+/g;
    let modifier = /[dms]/g;
    
    let md = digits.match(input);
    let mod = modifier.match(input);

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