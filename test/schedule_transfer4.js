var schedule = require('node-schedule');
var request = require('request');
var cheerio = require('cheerio');
var AccountBalanceTransfer = require('./AccountBalanceTransfer');

var current_page = 3001;
var max_page = 4000;
function scheduleCronstyle() {
    schedule.scheduleJob('*/2 * * * * ?', function () {
        console.info(new Date(),current_page);
        request('https://etherscan.io/token/generic-tokentxns2?contractAddress=0xbc647aad10114b89564c0a7aabe542bd0cf2c5af&mode=&m=normal&p='+current_page, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                // 输出网页内容
                var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析
                var accountBalanceArr = [];
                $("tbody tr").each(function(){
                    var accountBalanceFrom = [];
                    var accountBalanceTo = [];
                    var tdArr = $(this).children();
                    accountBalanceFrom.push(tdArr.eq(2).text());
                    accountBalanceTo.push(tdArr.eq(4).text());
                    accountBalanceArr.push(accountBalanceFrom);
                    accountBalanceArr.push(accountBalanceTo);

                });
                AccountBalanceTransfer.batchInsert(accountBalanceArr,function (err,data) {
                });
            }
        });

        if(current_page++>=max_page){
            this.cancel();
        }
    });
}

scheduleCronstyle();