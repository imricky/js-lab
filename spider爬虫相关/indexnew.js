const axios = require('axios');
const cheerio = require('cheerio')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/spider-test', { useNewUrlParser: true });


const db = mongoose.connection;

db.on('open', () => {
  console.log(`数据库连接已创建`)
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ArticlePost = new Schema({
  author: ObjectId,
  sourceId: Number,
  title: String,
  author: String,
  date: Date,
  content: String
});

const ArticleModel = mongoose.model('articlePost', ArticlePost)

function getSingleArticle(id) {
  axios.get(`http://www.acfun.cn/a/ac4579559`)
    .then((res) => {
      let arr = [];
      const html = res.data;
      const $ = cheerio.load(html);
      const articleContent = $('.article-content').html();
      //up主的名字
      const upname = $('.up-name>a').text();
      console.log(upname);
      //标题
      const articleTitle = $('.caption').text()
      console.log(articleTitle)

      let Article = new Object();
      Article.title = articleTitle;
      Article.upname = upname;
      Article.date = new Date();
      Article.sourceId = id;
      Article.content = articleContent;



      ArticleModel.create(Article).then((res) => {
        console.log(`存入成功`)
        db.close(() => {
          console.log('关闭连接')
        })
      });


    }, (e) => {
      //404的时候把id到一个失败的数据库里
      console.log(`404啦`)
      console.log(e.response.status)
      // console.log(e.response.data)
    })
    .catch(e => {
      console.log(123)
      console.log(e)
    });

}

getSingleArticle()
// 4579559
// 4581295
// http://www.acfun.cn/a/ac4581295


