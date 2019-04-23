const axios = require('axios');
const cheerio = require('cheerio')
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
    console.log(`文章内容：${articleObj.content}`)
    //up主名字
    const upname = $('.up-name>a').text();
    articleObj.author = upname;
    //文章标题
    const articleTitle = $('.caption').text()
    articleObj.title = articleTitle;
    //文章发布时间
    const articleTime = $('.up-time').text();
    articleObj.pub_date = articleTime;
    console.log(articleObj)
    return articleObj;
  } catch (error) {
    console.error(error);
    return {};
  }
}

getSingleArticle('http://www.acfun.cn/a/ac4579559', 4579559)