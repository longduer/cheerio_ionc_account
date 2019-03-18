var Web3 = require("web3"); //引入web3支持，我本地使用的是web3^0.18.4
var ioncHolder = require("./IONC_HOLDERS.js");

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

ioncHolder.getAllAccounts(1, 50, function (err,rows) {
    console.info("total length: " + rows.length);
    var accountBalanceArr = [];
    for (var i = 0;i<rows.length;i++) {
        var address = rows[i].address;
        var balance = IONCContract.balanceOf(address);
        balance = web3.fromWei(balance.toString(10));
        // console.info(address,balance);
        // ioncHolder.updateHolderBalance(address, balance,function (err,result) {
        //     if (err) {
        //         console.info(err,result);
        //     }
        // })
    }
});