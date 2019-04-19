const axios = require('axios');
const cheerio = require('cheerio')

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
      // console.log(res.status);
      // console.log(res.headers)

      // $('li').each(function(i, elem) {
      //   fruits[i] = $(this).text();
      // });

      const articleContent = $('.article-content').html();

      //文章内容
      var getTextOrImg = (dom) => {
        let arr = [];
        const domAll = $(dom); //加载article-content的dom

        // if(domAll.children().length === 0){
        //   arr.push(domAll.text());
        //   domAll.find('img').each(function(i,el){
        //     arr.push($(this).attr('src'));
        //   })
        // }else{
        //   getTextOrImg(domAll.children());
        // }
        // console.log(arr)






        //text === undefined
        // console.log(domAll.children().children().children().children().text() === ''); //判断条件
        // console.log(domAll.children().children().children().children()[13].attribs.src);
        // domAll.children().map(function(i,index,el){

        //   if($(this).find('img').attr('src') !== void 0){
        //     arr.push($(this).find('img').attr('src'))
        //   }
        // })
        // console.log(arr)

        // console.log(domAll.children().children('img').eq(0).attr('src')) 

        console.log(domAll.text())

        // domAll.children().children('img').each(function(i,el){
        //   arr.push($(this).attr('src'))
        // })
        domAll.find('img').each(function (i, el) {
          arr.push($(this).attr('src'))
        })
        console.log(arr)

      }

      getTextOrImg(articleContent);



      // const articleContent = $('.article-content').text();
      // const articleContent = $('.article-content').find($('img')).attr('src');
      // var t = $('.article-content').find('p');
      // var t2 = t.nextAll();
      // t2.map(function(){
      //   // arr.push($(this).text())
      //   console.log($(this).children().text())
      //   if($(this).find('img')){
      //     arr.push($(this).find('img').attr('src'))
      //   }else{
      //     if($(this).children().text() != '' || $(this).children().text() != null){
      //       arr.push($(this).children().text())
      //     }
      //   }
      // })
      // console.log(arr)



      // articleContent.map((i,index,arr)=>{
      //   if(i.children().find('img'))
      // })

      // console.log(articleContent.children().text())
      //up主的名字
      // const upname = $('.up-name>a').text(); 
      //标题
      // const articleTitle = $('.caption').text() 
      // console.log(articleTitle)

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
getSingleArticle(4581295);


function getContent(node){
  var a = node.contents();
  if (a.length == 0) {
      if (node.is('br')){
          RST+='\n';
      } else {
          RST+=node.text().trim();;
      }
  } else {
      node.contents().each(function(i, elem){
          getContent($(this));
      });

      if (node.is('p') || node.is('tr')){
          RST+='\n';
      }
  }
}


