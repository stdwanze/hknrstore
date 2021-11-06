var n = require("./notify");
var c = require("./cache");
var u = require("./utils");
var b = require("./beautify");


var one = {
  "chargingstatus": {
  "carCapturedTimestamp": "2021-11-06T08:34:57Z",
  "remainingChargingTimeToComplete_min": 5,
  "chargingState": "charging",
  "chargeMode": "manual",
  "chargePower_kW": 2,
  "chargeRate_kmph": 10
  },
  "batterystatus": {
  "carCapturedTimestamp": "2021-11-06T08:34:57Z",
  "currentSOC_pct": 79,
  "cruisingRangeElectric_km": 211
  },
  "plugstatus": {
  "carCapturedTimestamp": "2021-11-06T08:33:50Z",
  "plugConnectionState": "connected",
  "plugLockState": "locked"
  },
  "time": 1636187697000,
  "state": "charging",
  "whenhappend": "2021-11-06T08:34:57.0000000Z",
  "id": "b6dee702-a285-4a00-8dc3-244e9594e282"
};
 var two= {
  "chargingstatus": {
  "carCapturedTimestamp": "2021-11-06T08:38:20Z",
  "remainingChargingTimeToComplete_min": 0,
  "chargingState": "readyForCharging",
  "chargeMode": "manual",
  "chargePower_kW": 0,
  "chargeRate_kmph": 0
  },
  "batterystatus": {
  "carCapturedTimestamp": "2021-11-06T08:38:20Z",
  "currentSOC_pct": 80,
  "cruisingRangeElectric_km": 211
  },
  "plugstatus": {
  "carCapturedTimestamp": "2021-11-06T08:38:18Z",
  "plugConnectionState": "connected",
  "plugLockState": "locked"
  },
  "time": 1636187900000,
  "state": "parked",
  "whenhappend": "2021-11-06T08:38:20.0000000Z",
  "id": "d23fdc22-f519-42d9-b5f0-23a049541cf7"
  };

  //console.log(  u. toCosmosTime(new Date(one.time)));
c.addWakeUpListener(console.log);

// c.consume(one);
// c.consume(two);
/*
n.notify({ time: 1626184659000, other: "data0"});
n.notify({ time: 1626183659000, other: "data1"});
n.notify({ time: 1626185659000, other: "data2"});
n.notify({ time: 1626188659000, other: "data3"});
//b.beautifySet([ one,two]);
console.log(one);

*/
c.setLastValue(two);
c.checkForChargeEnd(two);
c.checkForChargeStart(one);

console.log(c.isNew(one));
