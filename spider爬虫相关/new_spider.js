const axios = require('axios');
const cheerio = require('cheerio')

function spider() {
  let spiderArr = generateFiveRandom(10);
  let resArr = [];
  let success = [];
  let error = [];
  for (let i = 0; i < spiderArr.length; i++) {
    let res = getSingleArticle(spiderArr[i])
    if(res.length === 0){
      error.push(spiderArr[i])
    }
    success.push(spiderArr[i])
    resArr.push(res);
  }
  console.log(resArr)
  console.log(`success:${success}`)
}

//获取文章结构
function getSingleArticle(id) {
  return axios.get(`http://www.acfun.cn/a/ac${id}`)
    .then((res) => {
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
    })
    .catch(e => {
      return [];
    })
}

// 4579559
// 4581295
//10119522
// http://www.acfun.cn/a/ac4581295
//getSingleArticle(10119522);
//generateFiveRandom()
//1.生成5个随机数，数值在500000-2000000之间
function generateFiveRandom(count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    let a = Math.round(Math.random() * 10000000 + Math.random() * 100000 + Math.random() * 100 + i)
    arr.push(a)
  }
  console.log(arr)
  return arr;
}

spider();
