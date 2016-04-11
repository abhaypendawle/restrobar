
/**
 * Created by Abhay on 3/8/2016.
 */
var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
    var connection = mysql.createConnection({
        host     : 'us-iron-auto-dca-03-a.cleardb.net',
        user     : 'bcb7574b95c2fb',
        password : '95d5b28c',
        database : 'ad_51546338346a681',
        port	 : 3306
    });
    return connection;
}


function fetchData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    var connection=getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}

function insertData(callback, sqlQuery){
    console.log("\nSQL Query::"+sqlQuery);

    var connection=getConnection();
    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}

exports.insertData=insertData;
exports.fetchData=fetchData;