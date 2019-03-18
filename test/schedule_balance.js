var schedule = require('node-schedule');
var Web3 = require("web3"); //引入web3支持，我本地使用的是web3^0.18.4
var ioncHolder = require("./IONC_HOLDERS.js");

var arguments = process.env.name;
console.log('所传递的参数是：', arguments);
var timerId = arguments;


var current_page = -1;
var max_page = timerId*10000;
var page_count = 3;
var interSec = 5;

//初始化web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
}

var ERC20 = require("./build/ERC20.json");
var contractABI = ERC20.abi;
var contractAddress = "0xbC647aAd10114B89564c0a7aabE542bd0cf2C5aF";
var IONCContract = web3.eth.contract(contractABI).at(contractAddress)

function scheduleCronstyle() {
    //6秒一次，一次取三条记录
    schedule.scheduleJob('*/'+interSec+' * * * * ?', function () {
        ioncHolder.getTimerCount(timerId, function (err,result) {
            current_page = result[0].count;
            console.info(new Date(), current_page);
            ioncHolder.getAllAccounts(page_count, current_page, function (err,rows) {
                var accountBalanceArr = [];
                for (var i = 0;i<rows.length;i++) {
                    var accountBalance = [];
                    var balance = IONCContract.balanceOf(rows[i].address);
                    balance = web3.fromWei(balance.toString(10));
                    var address = rows[i].address;
                    console.info(address,balance);
                    accountBalance.push(address);
                    accountBalance.push(balance);
                    accountBalanceArr.push(accountBalance);
                }
                ioncHolder.batchInsert(accountBalanceArr,function (err,result) {
                    //取消定时器
                    if(current_page++>=max_page){
                        this.cancel();
                    }
                    ioncHolder.updateTimerCount(timerId,current_page,function (err,result) {//console.info(err);});
                });
            });
        });
    });
}
scheduleCronstyle();