var express = require('express');
var router = express.Router();
var db = require('../database.js');
//MOMENT JS


/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Snapshot' });
  /*connection.query('SELECT * FROM tprojects', function(err, projects){
    connection.query('select * from tsnaps', function(err, snaps){
        res.render('index', {snapProjects: projects, snapSnaps:snaps});
    })
  });
*/
if(req.session.authenticate){
    db.getProjects(function(err, projects) {
        if(err) { 
            res.send(500,"Server Error"); 
            return;
        }
        db.getSnaps(function(err, snaps) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            db.getReasons(function(err, reasons) {
                if(err) { 
                    res.send(500,"Server Error"); 
                    return;
                }
                // Respond with results as JSON
                res.render('index', {snapProjects: projects, snapSnaps:snaps, reasons:reasons});
            });
        });
    });
}else{
    res.redirect(301,"/login");
}

});

router.get('/allsnaps', function(req, res) {
  //res.render('index', { title: 'Snapshot' });
  /*connection.query('SELECT * FROM tprojects', function(err, projects){
    connection.query('select * from tsnaps', function(err, snaps){
        res.render('index', {snapProjects: projects, snapSnaps:snaps});
    })
  });
*/
if(req.session.authenticate){

        db.getSnaps(function(err, snaps) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
                // Respond with results as JSON
                        res.render('tables/snapsList', {snapSnaps:snaps}, function(err, html){
                            req.session.filter=null;
                            req.session.manual = null;
                          res.send(html);
                        });
        });
}else{
    res.redirect(301,"/login");
}

});

router.get('/filter/:project', function(req,res){
    var obj = {
        manual: req.session.manual,
        project: req.param('project')
    }
            db.getProject(obj, function(err, snaps) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
                // Respond with results as JSON
                        res.render('tables/snapsList', {snapSnaps:snaps}, function(err, html){
                            req.session.filter=req.param('project');

                          res.send(html);
                        });
        });
});

router.get('/manualsnaps', function(req, res) {
  //res.render('index', { title: 'Snapshot' });
  /*connection.query('SELECT * FROM tprojects', function(err, projects){
    connection.query('select * from tsnaps', function(err, snaps){
        res.render('index', {snapProjects: projects, snapSnaps:snaps});
    })
  });
*/
if(req.session.authenticate){
        db.getManualSnaps(req.session.filter, function(err, snaps) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
                // Respond with results as JSON
                        res.render('tables/snapsList', {snapSnaps:snaps}, function(err, html){
                            req.session.manual = true;
                          res.send(html);
                        });
        });
}else{
    res.redirect(301,"/login");
}

});
router.post('/updateProjectName', function(req, res){
    if(req.session.authenticate){
        db.insertProject(req.body, function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }else{
                db.getProjects(function(err, projects) {
                    if(err) { 
                        res.send(500,"Server Error"); 
                        return;
                    }
                    res.render('tables/projectList', {snapProjects: projects}, function(err, html){
                        //console.log(html);
                      res.send(html);
                    });
                });
            }
        });
    }else{
        res.redirect(301,"/login");
    }
});

router.post('/addproject', function(req, res){
    if(req.session.authenticate){
        db.insertProject(req.body, function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }else{
                db.getProjects(function(err, projects) {
                    if(err) { 
                        res.send(500,"Server Error"); 
                        return;
                    }
                    res.render('tables/projectList', {snapProjects: projects}, function(err, html){
                        //console.log(html);
                      res.send(html);
                    });
                });
            }
        });
    }else{
        res.redirect(301,"/login");
    }
});
router.post('/addsnap', function(req, res){
    if(req.session.authenticate){
        db.insertSnap(req.body, function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }else{
                db.getProjects(function(err, projects) {
                    if(err) { 
                        res.send(500,"Server Error"); 
                        return;
                    }
                    db.getSnaps(function(err, snaps) {
                        if(err) { 
                            res.send(500,"Server Error"); 
                            return;
                        }
                        // Respond with results as JSON
                        res.render('tables/snapsList', {snapProjects: projects, snapSnaps:snaps}, function(err, html){
                          res.send(html);
                        });
                    });
                });
            }
        });
    }else{
        res.redirect(301,"/login");
    }
});
router.post('/deleteproject', function(req, res){
    if(req.session.authenticate){
        db.deleteProject(req.body, function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }else{
                db.getProjects(function(err, projects) {
                    if(err) { 
                        res.send(500,"Server Error"); 
                        return;
                    }
                    res.render('tables/projectList', {snapProjects: projects}, function(err, html){
                      res.send(html);
                    });
                });
            }
        });
    }else{
        res.redirect(301,"/login");
    }
});

router.post('/deletesnap', function(req, res){
    if(req.session.authenticate){
        db.deleteSnap(req.body, function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }else{
                db.getProjects(function(err, projects) {
                    if(err) { 
                        res.send(500,"Server Error"); 
                        return;
                    }
                    db.getSnaps(function(err, snaps) {
                        if(err) { 
                            res.send(500,"Server Error"); 
                            return;
                        }
                        // Respond with results as JSON
                        res.render('tables/snapsList', {snapProjects: projects, snapSnaps:snaps}, function(err, html){
                          res.send(html);
                        });
                    });
                });
            }
        });
    }else{
        res.redirect(301,"/login");
    }
});

module.exports = router;
