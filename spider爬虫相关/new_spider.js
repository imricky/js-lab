const axios = require('axios');
const cheerio = require('cheerio')
const mongoose = require('mongoose');
const Redis = require('ioredis');
const redis = new Redis();
mongoose.connect('mongodb://localhost:27017/spider-test', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connect')
});
var ArticleSchema = new mongoose.Schema({
  sourceId: String, //文章编号
  title: String, //标题
  author: String, //作者
  pub_date: String, //文章发布时间
  crawl_date: Date,//爬取时间
  content: Array //文章内容
});
var Article = mongoose.model('Article', ArticleSchema);

/**
 * 重写的函数
 */

/**
 * 控制时间
 */
const Thread = {
  Sleep: (d) => {
    //生成时间随机数
    //1000-2000之间
    let randomTime = parseInt(Math.random() * (2000 - 1000 + 1) + 1000, 10)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve.call()
      }, randomTime)
    })
  }
}

//1.生成5个随机数，数值在500000-2000000之间
// function generateFiveRandom(count) {
//   let arr = [];
//   for (let i = 0; i < count; i++) {
//     let a = parseInt(Math.random() * (20000000 - 50000 + 1) + 50000, 10)
//     arr.push(a)
//   }
//   console.log(arr)
//   return arr;
// }

//使用redis的spop功能，每次pop出随机的数，并且将失败的数放入失败池里
async function generateFiveRandom(count) {
  try {
    let res = await redis.spop('spider_ids_generate', count);
    console.log(res)
    redis.quit();
    return res
  } catch (e) {
    return [];
  }
}

async function spider(param) {
  console.log(`正在爬取中`)
  let spiderArr = await generateFiveRandom(20)
  let resArr = [];
  let success = [];
  let error = [];
  for (let i = 0; i < spiderArr.length; i++) {
    const url = `http://www.acfun.cn/a/ac${spiderArr[i]}`
    let res = await getSingleArticle(url, spiderArr[i])
    if (res.content.length === 0) {
      error.push(spiderArr[i])
    } else {
      success.push(spiderArr[i])
      resArr.push(res);
    }
    await Thread.Sleep(1000)
  }
  console.log(`成功：${success}`)
  console.log(`失败：${error}`)
  if (success.length !== 0) {
    var promise = Article.insertMany(resArr);
    promise.then((resolve) => {
      console.log('爬取成功,并存入数据库')
      db.close(() => {
        console.log('关闭连接')
      })
    }, (reject) => {
      console.log(`err${reject}`)
    })
  } else {
    db.close(() => {
      console.log('关闭连接,没有成功爬取一条')
    })
  }
}


async function getSingleArticle(url, sourceId) {
  try {
    const res = await axios.get(url);
    let articleObj = {
      sourceId: sourceId, //文章编号
      title: '', //标题
      author: '', //作者
      pub_date: '', //文章发布时间
      crawl_date: new Date(),//爬取时间
      content: [] //文章内容
    };
    let html = res.data;
    const $ = cheerio.load(html);
    //1.文章内容
    $('.article-content p').each(function (i, el) {
      let content = $(el).text();
      articleObj.content.push(content);
      $(el).find('img').each(function (i, el) {
        articleObj.content.push($(this).attr('src'))
      })
    })
    $('.article-content div').each((i, el) => {
      let content = $(el).text();
      articleObj.content.push(content);
      $(el).find('img').each(function (i, el) {
        articleObj.content.push($(this).attr('src'))
      })
    })

    articleObj.content = articleObj.content.filter((el, i) => {
      return el !== ''
    })
    console.log(`文章内容${sourceId}：${articleObj.content}`)
    //up主名字
    const upname = $('.up-name>a').text();
    articleObj.author = upname;
    //文章标题
    const articleTitle = $('.caption').text()
    articleObj.title = articleTitle;
    //文章发布时间
    const articleTime = $('.up-time').text();
    articleObj.pub_date = articleTime;

    return articleObj;
  } catch (error) {
    console.error(error);
    return {};
  }
}
spider();


// 4579559
// 4581295
//10119522
// http://www.acfun.cn/a/ac4581295
// spider();
//5868513,1089310,2235871,4097122,4060463
