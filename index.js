var async = require('async');
 
exports.handler = function(event, context) {
  async.series([
    function (callback) {
      console.log("one");
      callback(null, "one");
    },
    function (callback) {
      console.log("two");
      callback(null, "two");
    },
    function (callback) {
      console.log("three");
      callback(null, "three");
    }
  ], function (err, results) {
    if (err) {
        throw err;
    }
    console.log('all done. ' + results);
    context.succeed('suceeeeeeeeeeeees');
  });
};
