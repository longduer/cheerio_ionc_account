var db = require('./db');


var IONCHolders={
    getAllAccounts:function(num,offset, callback){
        return db.query("select * from ionc_holders order by id asc limit ? offset ?", [num, offset], callback);
    }
    ,
    batchInsert:function (values, callback) {
        db.query("" +
            "insert into " +
            "   account_balance_loop(" +
            "       address, " +
            "       balance" +
            ")" +
            "   VALUES ?",
            [
                values
            ],
            callback);
    },
    getTimerCount: function (id,callback) {
        return db.query("select * from timer_count where id = ? ",[id],callback);
    },
    updateTimerCount: function (id, count,callback) {
        return db.query("update timer_count set count = ? where id = ? ",[count,id],callback);
    }
};

module.exports = IONCHolders;