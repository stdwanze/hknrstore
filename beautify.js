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

function beautifySingle(state){

    delete state._rid;
    delete state._self;
    delete state._etag;
    delete state._attachments;
    delete state._ts;


}
function beautifySet(states){


    states.forEach(element => {
        beautifySingle(element)
    });
}

function selectConsumption(states){

    let ret = [];
    states.forEach(element => {
       let ne = {
            consumptionPercentPerMin : element.currentConsumptionInPercent,
            whenhappend: element.whenhappend
       }
       ret.push(ne);
    });
    return ret;

}

module.exports = {
    beautifySet,
    selectConsumption
}