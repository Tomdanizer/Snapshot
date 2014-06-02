var express = require('express');
var router = express.Router();
var db = require('../database.js');
//MOMENT JS


/* GET home page. */
router.get('/', function(req, res) {
    if(req.session.authenticate){
        db.getReasons(function(err, reasons) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            
            res.render('reasons', {url: req.originalUrl, username: req.session.user, reasons:reasons});
        });
    }else{
        res.redirect(301,"/login");
    }

});

router.post('/addreason', function(req, res){
    if(req.session.authenticate){
        db.insertReason(req.body, function(err, reasons) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }else{
                db.getReasons(function(err, reasons) {
                    if(err) { 
                        res.send(500,"Server Error"); 
                        return;
                    }
                    res.render('tables/reasonsList', {reasons: reasons}, function(err, html){
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



module.exports = router;