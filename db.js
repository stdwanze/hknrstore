const CosmosClient = require('@azure/cosmos').CosmosClient

const config = require('./config')
const url = require('url')

const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/hnkr'] }

const options = {
      endpoint: endpoint,
      key: key,
      userAgentSuffix: 'CosmosDBJavascriptQuickstart'
    };

const client = new CosmosClient(options)
async function queryContainerRange(start,end) {

  console.log(`Querying container:\n${config.container.id}`)

  var startdate = start.getTime();
  var enddate = end.getTime();
  //var startdate = offsethours==0 ? Date.now() - 604800000 : Date.now() - (offsethours*1000*60*60);
 
  // query to return all children in a family
  // Including the partition key value of country in the WHERE filter results in a more efficient query
  const querySpec = {
    query: 'SELECT * from c where (c["time"] >  '+startdate+' && c["time"] <  '+enddate+') ',
  //   parameters: [
  //     {
  //       name: '@country',
  //       value: 'USA'
  //     }
  //   ]
  }

  const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll();

    return results;

}


 async function queryContainer(offsethours,range) {

    console.log(`Querying container:\n${config.container.id}`)


    var startdate = offsethours==0 ? Date.now() - 604800000 : Date.now() - (offsethours*1000*60*60);
   
    // query to return all children in a family
    // Including the partition key value of country in the WHERE filter results in a more efficient query
    const querySpec = {
      query: 'SELECT * from c where (c["time"] >  '+startdate+') ',
    //   parameters: [
    //     {
    //       name: '@country',
    //       value: 'USA'
    //     }
    //   ]
    }

    const { resources: results } = await client
      .database(databaseId)
      .container(containerId)
      .items.query(querySpec)
      .fetchAll();

      return results;

  }

  async function upSert(item){

    const { iitem } = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(item);

    return iitem;

}

  module.exports = {
      queryContainer,
      upSert,
      queryContainerRange
  }