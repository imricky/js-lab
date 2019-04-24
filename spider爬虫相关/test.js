var Redis = require('ioredis');
var redis = new Redis();
const dayjs = require('dayjs')
redis.quit()
  // (async function generateIDsToRedis() {
  //   // for (let i = 0; i < 2000; i++) {
  //   //   const arr = new Array(10000);
  //   //   for (let j = 0; j < 10000; j++) {
  //   //     arr.push(i * 10000 + j);
  //   //   }
  //   //   await redis.sadd('spider_ids_generate', ...arr);
  //   // }
  //   //生成id为400w到2000w的数据,提供爬虫爬取
  //   // console.time('begin')
  //   // let arr = [];
  //   // for (let i = 4000; i < 20000; i++) {
  //   //   const arr = new Array(1000);
  //   //   for (let j = 0; j < 1000; j++) {
  //   //     arr.push(i * 1000 + j);
  //   //   }
  //   //   await redis.sadd('spider_ids_generate', ...arr)
  //   // }
  //   // console.timeEnd('begin')
  //   //let res = await redis.spop('spider_ids_generate',5)
  //   return [1, 2, 3];
  // })()
  // .then(r => {
  //   console.log(r)
  //   console.log('done');
  // })
  // .catch(e => {
  // });


let timetest1 = '2018年09月13日   08:58:04';
let a = dayjs(timetest1).format('YYYY年MM月DD日   hh:mm:ss').valueOf()
console.log(a)
console.log(dayjs().valueOf())
