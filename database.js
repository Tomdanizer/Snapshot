var mysql = require('mysql');
var moment = require("moment");
/*var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'qwerty'
    });
*/
var pool = mysql.createPool({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'qwerty',
        database : 'snaps',
        connectionLimit: 10,
        supportBigNumbers: true
})

// Get records from a city
exports.getProjects = function(callback) {
  var sql = "SELECT tprojects_name, tprojects_group, tprojects_base, CASE WHEN tprojects_active = 1 THEN 1 ELSE 0 END AS tprojects_active FROM snaps.tprojects;";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            console.log(results);
            callback(false, results);
        });
    });
};

// Get a specific project
exports.getProject = function(project, callback) {
  var sql; 
  if(project.manual){
        sql = "SELECT * FROM tsnaps where tsnaps_project = ? and tsnaps_type = 'manual'";
    }else{
        sql = "SELECT * FROM tsnaps where tsnaps_project = ?";
    }

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        console.log("PROJECT");
        console.log(project);
        // make the query
        connection.query(sql, [project.project], function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};


exports.getSnaps = function(callback) {
  var sql = "SELECT * FROM tsnaps";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};
exports.getManualSnaps = function(project, callback) {
  var sql;
  if(project){
    sql = "SELECT * FROM tsnaps where tsnaps_type = 'manual' and tsnaps_project = ?";
  }else{
    sql = "SELECT * FROM tsnaps where tsnaps_type = 'manual'";
  }
   

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, [project], function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};
// Get records from a city
exports.getReasons = function(callback) {
  var sql = "SELECT * FROM tsnapreasons";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};


/* INSERT STATEMENTS */
exports.insertProject = function(project, callback) {
  var sql = "INSERT INTO tprojects (tprojects_name, tprojects_group, tprojects_active, tprojects_base) VALUES  (?, ?, 1, ?);"

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, [project.name, project.group, project.share], function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};

exports.insertSnap = function(snap, callback) {
  var sql = "INSERT INTO tsnaps" +
            "(tsnaps_reason," +
                "tsnaps_id," +
                "tsnaps_taken," +
                "tsnaps_ttl," +
            "tsnaps_project," +
            "tsnaps_base," +
            "tsnaps_notes," +
            "tsnaps_type)" +
            "VALUES" +
            "(?,?,UNIX_TIMESTAMP(),0," + //reason, id
            "?," +//project
            "?," + //base
            "?," + //note
            "'manual');"
console.log(sql)
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        console.log(moment().format("YYYY.MM.DD-HH.MM.SS"));
        connection.query(sql, [snap.reason, "GMT-"+moment().format("YYYY.MM.DD-HH.MM.SS"), snap.project, snap.base, snap.note], function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};

/* DELETE STATEMENTS */
exports.deleteProject = function(project, callback) {
  var sql = "DELETE FROM tprojects WHERE tprojects_name IN (?);"
console.log(project)
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, [project], function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};
exports.deleteSnap = function(snap, callback) {
  var sql = "DELETE FROM tsnaps WHERE tsnaps_id IN (?);"
console.log(snap)
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){ 
            console.log(err); 
            callback(true); 
            return; 
        }
        // make the query
        connection.query(sql, [snap], function(err, results) {
          if(err) { 
            console.log(err);
            callback(true); 
            return; 
            }
            connection.release();
            callback(false, results);
        });
    });
};