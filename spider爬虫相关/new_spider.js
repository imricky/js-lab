const axios = require('axios');
const cheerio = require('cheerio')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/spider-test', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connect')
});
var ArticleSchema = new mongoose.Schema({
  content: Array,
  success: Array,
  error: Array
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
function generateFiveRandom(count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    let a = parseInt(Math.random() * (20000000 - 500000 + 1) + 500000, 10)
    arr.push(a)
  }
  console.log(arr)
  return arr;
}

async function spider(param) {
  console.log(`正在爬取中`)
  let spiderArr = generateFiveRandom(5)
  let resArr = [];
  let success = [];
  let error = [];
  for (let i = 0; i < spiderArr.length; i++) {
    const url = `http://www.acfun.cn/a/ac${spiderArr[i]}`
    let res = await getSingleArticle(url)
    if (res.length === 0) {
      error.push(spiderArr[i])
    } else {
      success.push(spiderArr[i])
      resArr.push(res);
    }
    await Thread.Sleep(1000)
  }
  console.log(`成功：${success}`)
  console.log(`失败：${error}`)
  console.log(`结果：${resArr}`)
  let insertObj = {
    content: resArr,
    success: success,
    error: error
  }
  var promise = Article.create(insertObj);
  promise.then(function (jawbreaker) {
    console.log('爬取成功,并存入数据库')
    db.close(() => {
      console.log('关闭连接')
    })
  })
}


async function getSingleArticle(url) {
  try {
    const res = await axios.get(url);
    let arr = [];
    let html = res.data;
    const $ = cheerio.load(html);
    $('.article-content p').each(function (i, el) {
      let content = $(el).text();
      arr.push(content)
      $(el).find('img').each(function (i, el) {
        arr.push($(this).attr('src'))
      })
    })
    $('.article-content div').each((i, el) => {
      let content = $(el).text();
      arr.push(content)
      $(el).find('img').each(function (i, el) {
        arr.push($(this).attr('src'))
      })
    })

    arr = arr.filter((el, i) => {
      return el !== ''
    })
    console.log(arr)
    return arr;
  } catch (error) {
    console.error(error);
    return [];
  }
}

spider();
// 4579559
// 4581295
//10119522
// http://www.acfun.cn/a/ac4581295
// spider();
//5868513,1089310,2235871,4097122,4060463
