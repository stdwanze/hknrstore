const polka = require('polka');
const { json } = require('body-parser');

const { queryContainer, upSert, queryContainerRange} = require('./db');
const { toCosmosTime } = require("./utils");
const { consume , addWakeUpListener, setLastValue} = require("./cache");
const { notify } = require("./notify");
const { beautifySet , selectConsumption} = require('./beautify');
const { getlastvalue,savelastvalue,getlastvalueWn,savelastvalueWn } = require('./lastvaluemanager');
const { enterNewConsumption, getConsumption} = require("./consumptionpertime");
const { getMod, getDigit, setupOffset} = require("./offsetparser");

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
  .get('/consumption',(req,res)=> {
    res.end(JSON.stringify(getlastvalueWn("consumption")));
  })
  .get('/consumption/json/:offset?',async (req,res) => {
    let { offset } = req.params;
    setupOffset(offset);
    var start = new Date();

    switch(getMod()){
      case "d": start.setDate(start.getDate() - getDigit()); break;
      case "m": start.setDate(start.getMinutes() - getDigit()); break;
      case "s": start.setDate(start.getSeconds() - getDigit()); break;

    }


    let r = await queryContainerRange(start,new Date());
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