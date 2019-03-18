var db = require('./db');


var AccountBalanceTransfer={
    addAccount:function(Account,callback){
        return db.query("Insert into account_balance_transfer values(?,?)",
            [Account.address,Account.balance],callback);
    }
    ,getAllAccounts:function(num, offset, callback){
        return db.query("select * from account_balance_transfer order by balance desc limit ? offset ?", [num, offset], callback);
    },
    batchInsert:function (values, callback) {
        db.query("" +
            "insert into " +
            "   account_balance_transfer(" +
            "       address" +
            ")" +
            "   VALUES ?",
            [
                values
            ],
            callback);
    }
};

module.exports = AccountBalanceTransfer;