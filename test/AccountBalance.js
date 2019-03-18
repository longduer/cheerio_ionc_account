var db = require('./db');


var AccountBalance={
    addAccount:function(Account, callback){
        return db.query("Insert into account_balance values(?,?)",
            [Account.address,Account.balance],callback);
    }
    ,getAllAccounts:function(num, offset, callback){
        return db.query("select * from account_balance order by balance desc limit ? offset ?", [num, offset], callback);
    },
    batchInsert:function (values, callback) {
        db.query("" +
            "insert into " +
            "   account_balance(" +
            "       address, " +
            "       balance" +
            ")" +
            "   VALUES ?",
            [
                values
            ],
            callback);
    }
};

module.exports = AccountBalance;