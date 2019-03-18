var request = require('request');

var cheerio = require('cheerio');

// 通过 GET 请求来读取 http://cnodejs.org/ 的内容
request('https://etherscan.io/token/generic-tokenholders2?a=0xbc647aad10114b89564c0a7aabe542bd0cf2c5af&m=normal&s=5.2E%2b26&p=1', function (error, res, body) {
    if (!error && res.statusCode == 200) {
        // 输出网页内容
        var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析
        $("tbody tr").each(function(){
            var tdArr = $(this).children();
            console.info(tdArr.eq(1).text(),tdArr.eq(2).text());
        });
    }
});

