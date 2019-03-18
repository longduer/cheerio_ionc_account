var async = require('async');
let userEmailList = [ 'a@example.com', 'b@example.com', '332@a.com','z@example.com' ];
let limit = 2;
let processer = function (email) {
    console.info(email);
};


async.eachLimit(userEmailList, limit, processer, function (error){
    console.log(error);
});