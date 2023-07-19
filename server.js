const polka = require('polka');
const { json } = require('body-parser');

const { queryContainer, upSert, queryContainerRange} = require('./db');
const { toCosmosTime, substract } = require("./utils");
const { consume , addWakeUpListener, setLastValue} = require("./cache");
const { notify } = require("./notify");
const { beautifySet , selectConsumption} = require('./beautify');
const { getlastvalue,savelastvalue,getlastvalueWn,savelastvalueWn } = require('./lastvaluemanager');
const { enterNewConsumption, getConsumption} = require("./consumptionpertime");
const { getMod, getDigit, setupOffset} = require("./offsetparser");
const { handlePos } = require("./postracker");

polka()
    .use(json())
    .get('/lastval', (req,res) =>{
       res.end(JSON.stringify(getlastvalue()));
    })
  .get('/states/', async (req, res) => {
    const r = await queryContainer();

    var result = r.length + "\n";
    r.forEach((i)=>{
        result += JSON.stringify(i) + "\n";
    })

    res.end(result);
  })
  .get('/pos', (req,res)=> {
    res.end(JSON.stringify(getlastvalueWn("postracker")));
  })
  .get('/pos/plain', (req,res)=> {
    
    let ret = "";
    
    getlastvalueWn("postracker").forEach((i)=>{
      ret += i.csv + "\n";
    })
    
    res.end(ret);
  })
  .get('/pos/show', (req,res)=>{
    let posarr = getlastvalueWn("postracker");
    let lastpos = posarr[lposarr.length-1];
    let html = "<html><head><meta http-equiv=\"refresh\" content=\"0; url='https://www.google.de/maps/place/49%C2%B004\'43.0%22N+9%C2%B003\'55.9%22E\'\" /></head><body></body></html>";
    res.end(html);
  })
  .get('/consumption',(req,res)=> {
    res.end(JSON.stringify(getlastvalueWn("consumption")));
  })
  .get('/consumption/json/:offsetstart?/:offsetend?',async (req,res) => {
    let { offsetstart,offsetend } = req.params;
    setupOffset(offsetstart);
    var start = new Date();
    start= substract(start,getDigit(),getMod());
    console.log("startdate: "+start);

    setupOffset(offsetend);
    var end = new Date();
    end= substract(end,getDigit(),getMod());
    console.log("endDate: "+end);

    let r = await queryContainerRange(start,end);
    beautifySet(r);
    r= selectConsumption(r);
    var result = JSON.stringify(r);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(result);
  })
  .get('/states/json/:offset?', async (req, res) => {
    let { offset } = req.params;
    let hours = parseInt(offset) || 0;
    const r = await queryContainer(hours);
    beautifySet(r);
    var result = JSON.stringify(r);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(result);
  })
  .post('/state', async (req, res) => {
     var a = req.body;
     const time =  toCosmosTime(new Date(a.time))
     a.whenhappend = time;
     addWakeUpListener(notify);

    let oldstack = getlastvalueWn("postracker");
    oldstack = handlePos(a,oldstack);
    savelastvalueWn(oldstack,"postracker");

    savelastvalue(a);
    a = consume(a);
    if(a != null){
      enterNewConsumption(a);
      a.currentConsumptionInPercent = getConsumption();
      savelastvalueWn({Consumption: a.currentConsumptionInPercent},"consumption");
    }
    if(a != null )await upSert(a);
    res.end('posted '+JSON.stringify(req.body) + " delivered "+ (a != null));
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });