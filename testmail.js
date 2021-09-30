var n = require("./notify");
var c = require("./cache");
var u = require("./utils");
n.notify({ time: 1626184659000, other: "data"});


var one = {
    "chargingstatus": {
    "carCapturedTimestamp": "2021-09-23T08:40:02Z",
    "remainingChargingTimeToComplete_min": 0,
    "chargingState": "readyForCharging",
    "chargeMode": "manual",
    "chargePower_kW": 0,
    "chargeRate_kmph": 0
    },
    "batterystatus": {
    "carCapturedTimestamp": "2021-09-23T08:40:02Z",
    "currentSOC_pct": 59,
    "cruisingRangeElectric_km": 225
    },
    "plugstatus": {
    "carCapturedTimestamp": "2021-09-23T08:40:00Z",
    "plugConnectionState": "disconnected",
    "plugLockState": "unlocked"
    },
    "time": 1632386402000,
    "state": "parked",
    "whenhappend": "2021-09-23T09:40:02.0000000Z",
    "id": "ea1a6d87-f17b-4b4f-8a17-c065bbed7d08",
    "_rid": "eI0vAN6qwu9mNQAAAAAAAA==",
    "_self": "dbs/eI0vAA==/colls/eI0vAN6qwu8=/docs/eI0vAN6qwu9mNQAAAAAAAA==/",
    "_etag": "\"770028fe-0000-0d00-0000-614c3d790000\"",
    "_attachments": "attachments/",
    "_ts": 1632386425
    };
var two = {
    "chargingstatus": {
    "carCapturedTimestamp": "2021-09-23T08:40:02Z",
    "remainingChargingTimeToComplete_min": 0,
    "chargingState": "readyForCharging",
    "chargeMode": "manual",
    "chargePower_kW": 0,
    "chargeRate_kmph": 0
    },
    "batterystatus": {
    "carCapturedTimestamp": "2021-09-23T08:40:02Z",
    "currentSOC_pct": 59,
    "cruisingRangeElectric_km": 225
    },
    "plugstatus": {
    "carCapturedTimestamp": "2021-09-23T08:40:00Z",
    "plugConnectionState": "disconnected",
    "plugLockState": "unlocked"
    },
    "time": 1632386502000,
    "state": "parked",
    "whenhappend": "2021-09-23T09:40:02.0000000Z",
    "id": "ea1a6d87-f17b-4b4f-8a17-c065bbed7d08",
    "_rid": "eI0vAN6qwu9mNQAAAAAAAA==",
    "_self": "dbs/eI0vAA==/colls/eI0vAN6qwu8=/docs/eI0vAN6qwu9mNQAAAAAAAA==/",
    "_etag": "\"770028fe-0000-0d00-0000-614c3d790000\"",
    "_attachments": "attachments/",
    "_ts": 1632386425
    };

  //console.log(  u. toCosmosTime(new Date(one.time)));
// c.addWakeUpListener(console.log);

// c.consume(one);
// c.consume(two);

