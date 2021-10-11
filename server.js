const polka = require('polka');
const { json } = require('body-parser');

const { queryContainer, upSert} = require('./db');
const { toCosmosTime } = require("./utils");
const { consume , addWakeUpListener} = require("./cache");
const { notify } = require("./notify");
const { beautifySet } = require('./beautify');
const { authenticate, authorize, cors } = require('./auth');

let port = process.env.PORT ? process.env.PORT : 3000;

polka()
    .use(json())
    .use(authenticate)
    .use(authorize)
    .use(cors)
  .get('/states/', async (req, res) => {
    const r = await queryContainer();

    var result = r.length + "\n";
    r.forEach((i)=>{
        result += JSON.stringify(i) + "\n";
    })

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
     a = consume(a);
     if(a != null )await upSert(a);
     res.end('posted '+JSON.stringify(req.body) + " delivered "+ (a != null));
  })
  .listen(port, err => {
    if (err) throw err;
    console.log(`> Running on localhost:`+port);
  });