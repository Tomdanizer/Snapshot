var express = require('express');
var router = express.Router();
var db = require('../database.js');

/* GET users listing. */
router.get('/', function(req, res) {
  //console.log(req.session);
  if(req.session.authenticate === false){
    req.session.authenticate = null
   res.render('login', { error: "danger", message:"Invalid login. Please check your username and password"}); 
  }else{
    res.render('login');
  }
   
});

router.post('/authenticate', function(req, res) {

//LDAP
var ldap = require('ldapjs');
var username = req.body.username;
var password = req.body.password;

ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
    var client = ldap.createClient({ 
          url: 'ldap://127.0.0.1',
          timeout: 5000,
          connectTimeout: 100000
    });
    var opts = {
      filter: '(&(memberOf=cn=IT1,ou=Groups,dc=com)(userPrincipalName=' + username + '))',
      scope: 'sub',
      attributes: ['objectGUID']
    };

    //console.log('--- going to try to connect user ---');

    try {
        client.bind(username, password, function (error) {
            if(error){
                //console.log(error.dn);
                //console.log(error.name);
                //console.log(error.message);
                //console.log("invalid login");
                req.session.authenticate = false;
                res.redirect(301,'../login');

                client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
            } else {
                //console.log('connected');
                client.search('dc=com', opts, function(error, search) {
                    //console.log('Searching.....');
                    req.session.authenticate = false;
                    search.on('searchEntry', function(entry) {
                        if(entry.object){
                            //console.log('entry: %j ' + JSON.stringify(entry.object));
                            req.session.authenticate = true;
                            req.session.user = username;
                        }else{
                          //console.log("ldap search failed.");
                            req.session.authenticate = false;
                        }
                    });

                    search.on('error', function(error) {
                        console.error('error: ' + error.message);
                    });
                    search.on('end', function(result) {
                        //console.log('status: ' + result.status);
                        if(req.session.authenticate){
                          res.redirect(301, '/');
                        }else{
                          res.redirect(301,'../login');
                        }
                      });
                    client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
    
                });
            }
        });
    } catch(error){
        //console.log(error);
        client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
    }











   //res.redirect(301, '/');
});
router.post('/', function(req, res){
        db.insertProject("test", function(err, projects) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            res.render('projectList', { snapProjects: projects}, function(err, html){
              res.send(html);
            });
            //res.send('User added to database with ID: ' + snaps.insertId);
        });
});

module.exports = router;
