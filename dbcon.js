/*Server/database info removed for security*/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  dateStrings	  : true,
  host            : 'host_name',
  user            : 'user_name',
  password        : 'password',
  database        : 'database_name'

});
module.exports.pool = pool;


