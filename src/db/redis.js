const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

  const client = redis.createClient({
    url: `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`
  });
  client.on('error', (err) => console.log('Redis Client Error', err));
 client.connect();
 function set(key,val){
    if(typeof val==='object'){
        val=JSON.stringify(val)
    }
    client.set(key, val);
 }
 function get(key){
     return client.get(key)
 }
 module.exports={
     set,
     get
 }