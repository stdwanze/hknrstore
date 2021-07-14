const polka = require('polka');
const { json } = require('body-parser');

const { queryContainer, upSert} = require('./db');
const { toCosmosTime } = require("./utils");
const { consume } = require("./cache");
polka()
    .use(json())
  .get('/states/', async (req, res) => {
    const r = await queryContainer();

    var result = "";
    r.forEach((i)=>{
        result += JSON.stringify(i) + "\n";
    })

    res.end(result);
  })
  .post('/state', async (req, res) => {
     var a = req.body;
     const time =  toCosmosTime(new Date(a.time))
     a.whenhappend = time;
     a = consume(a);
     if(a != null )await upSert(a);
     res.end('posted '+JSON.stringify(req.body) + " delivered "+ (a != null));
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });