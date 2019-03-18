var schedule = require('node-schedule');
var request = require('request');
var cheerio = require('cheerio');
var accountBalance = require('./AccountBalance');

var current_page = 1;
var max_page = 20;
function scheduleCronstyle() {
    schedule.scheduleJob('*/2 * * * * ?', function () {
        console.info(new Date(),current_page);
        request('https://etherscan.io/token/generic-tokenholders2?a=0xbc647aad10114b89564c0a7aabe542bd0cf2c5af&m=normal&s=5.2E%2b26&p='+current_page, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                // 输出网页内容
                var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析
                var accountBalanceArr = [];
                $("tbody tr").each(function(){
                    var accountBalance = [];
                    var tdArr = $(this).children();
                    accountBalance.push(tdArr.eq(1).text());
                    accountBalance.push(tdArr.eq(2).text().replace(new RegExp(/(,)/g),''));
                    accountBalanceArr.push(accountBalance);
                });
                accountBalance.batchInsert(accountBalanceArr,function (err,data) {
                });
            }
        });

        if(current_page++>=max_page){
            this.cancel();
        }
    });
}

scheduleCronstyle();