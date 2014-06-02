var express = require('express');
var router = express.Router();
var db = require('../database.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res){
        db.insertProject("test", function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            res.render('projectList', { snapProjects: projects}, function(err, html){
                //console.log(html);
              res.send(html);
            });
            //res.send('User added to database with ID: ' + snaps.insertId);
        });
});

module.exports = router;
