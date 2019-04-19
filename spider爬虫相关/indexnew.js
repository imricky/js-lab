const axios = require('axios');
const cheerio = require('cheerio')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/axiosAcfunTest',{ useNewUrlParser: true });


const db = mongoose.connection;

db.on('open',()=>{
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
  content:String
});

const ArticleModel = mongoose.model('articlePost', ArticlePost)

//会返回如下信息
// axios.get('/user/12345')
//   .then(function(response) {
//     console.log(response.data);
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.headers);
//     console.log(response.config);
//   });

function getSingleArticle(id) {
  axios.get(`http://www.acfun.cn/a/ac${id}`)
    .then((res) => {
      let arr = [];
      const html = res.data;
      const $ = cheerio.load(html);
      const articleContent = $('.article-content').html();

      //文章内容
      var getTextOrImg = (dom) => {
        let arr = [];
        const domAll = $(dom); //加载article-content的dom
        // console.log(domAll.text())
        arr.push(domAll.text())
        domAll.find('img').each(function (i, el) {
          arr.push($(this).attr('src'))
        })
        // console.log(arr)
        let content = arr;
        return content;
      }

      let content = getTextOrImg(articleContent);
      // articleContent.map((i,index,arr)=>{
      //   if(i.children().find('img'))
      // })

      // console.log(articleContent.children().text())
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
      Article.content = content;


      
      ArticleModel.create(Article).then((res)=>{
        console.log(`存入成功`)
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

// 4579559
// 4581295
// http://www.acfun.cn/a/ac4581295
var spiderArray = [123,234456,678345,5675647,4579559]
for(let i = 4579559;i<4579569;i++){
  //console.log(spiderArray[i])
  // setInterval(getSingleArticle(spiderArray[i]),1000);
  getSingleArticle(i);
}
// getSingleArticle(4579559);


