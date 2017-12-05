/* Name: Haris Sohail
* Date: 11/26/2017
*  NBA Database Project 
* 
*/


module.exports = function(){
    var express = require('express');
    var router = express.Router();

/*Selects specific rows from player table in database. Then passes them to handlebars to display. Main Page.*/
    function getPlayersT(res, mysql, context, complete){
        mysql.pool.query("SELECT p.id, p.fname, p.lname, p.date_drafted, p.current_age, p.ppg, t1.name AS current_team, t2.name AS draft_team FROM nba_player p LEFT JOIN nba_team t1 ON t1.id = p.current_team LEFT JOIN nba_team t2 ON t2.id = p.draft_team", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.plays = results;
            complete();
        });
    }

    /*Selects specific rows from player table in database. Then passes them to handlebars to display.*/
       function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT id, fname, lname, date_drafted, current_age, ppg, current_team, draft_team FROM nba_player", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.plays = results;
            complete();
        });
    }

/*Selects specific rows from position table in database. Then passes them to handlebars to display. NBA position page.*/
    function getPosition(res, mysql, context, complete){
        mysql.pool.query("SELECT id, title FROM nba_position", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.position = results;
            complete();
        });
    }

/*Selects specific rows from team table in database. Then passes them to handlebars to display. Team Page.*/
    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT t.id, t.name, t.championships, t.year_created, t.mascot, s.name AS stadium FROM nba_team t INNER JOIN nba_stadium s ON t.stadium = s.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams = results;
            complete();
        });
    }

    /*Selects specific rows from stadium table in database. Then passes them to handlebars to display. Stadium Page.*/
    function getStadium(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, seating, state FROM nba_stadium", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stadium = results;
            complete();
        });
    }

/*Selects specific rows from player and position table in database. Then passes them to handlebars to display. Players and Positions Page.*/
     function getPlayerPos(res, mysql, context, complete){
        mysql.pool.query("SELECT pa.fname, pa.lname, po.title FROM nba_player pa INNER JOIN nba_player_position plp ON pa.id = plp.player_id INNER JOIN nba_position po ON po.id = plp.position_id", 
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.playerPos = results;
            complete();
        });
    }

    

/*Selects a specific player table in database. Then passes them to handlebars to display. Update page.*/

   function getStar(res, mysql, context, id, complete){
        var sql = "SELECT id, fname, lname, date_drafted, current_age, ppg, current_team, draft_team FROM nba_player WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.star = results[0];
            complete();
        });
    }





/*Renders the main page.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteplayer.js"];
        var mysql = req.app.get('mysql');
        getPlayersT(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('players', context);
            }

        }
    });

    /*Renders team page. */
 router.get('/teams1', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('teams1', context);
            }

        }
    });


 /*Renders stadium page.*/
 router.get('/stadiums', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStadium(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('stadiums', context);
            }

        }
    });



      /*Renders positions page*/
 router.get('/positions', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPosition(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('positions', context);
            }

        }
    });



     /*Renders players and positions page*/
 router.get('/player-position', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayerPos(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('player-position', context);
            }

        }
    });

/***********************************************************************************************************/
/******************************LIST OF SEARCH FUNCTIONS AND REQUESTS*************************************/

/*Renders main search home page*/
 router.get('/search', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('search', context);
            }

        }
    });



/*Renders searchPlayer page*/
 router.get('/searchPlayer', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('searchPlayer', context);
            }

        }
    });


/*Returns the rows with specified name matching from the post request within nba_player*/
   function getNames(res, mysql, context, name, complete){
    var sql = "SELECT p.id, p.fname, p.lname, p.date_drafted, p.current_age, p.ppg, t1.name AS current_team, t2.name AS draft_team FROM nba_player p LEFT JOIN nba_team t1 ON t1.id = p.current_team LEFT JOIN nba_team t2 ON t2.id = p.draft_team WHERE fname=?";
        var inserts = [name];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.starName = results;
            complete();
        });
    }


    /*Renders the result table after the search is completed for nba players*/
    router.post('/searchPlayerResult', function(req, res){
                callbackCount = 0;
                var context = {};
                var mysql = req.app.get('mysql');
                getNames(res, mysql, context, req.body.fname, complete);
                function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                    res.render('searchPlayerResult', context);
                }

                } 
        
    });

    /*Renders searchTeam page*/
 router.get('/searchTeam', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('searchTeam', context);
            }

        }
    });

/*Returns the rows with specified championships value from the post request within nba_team*/
   function getTeamsR(res, mysql, context, team, complete){
    var sql = "SELECT t.id, t.name, t.championships, t.year_created, t.mascot, s.name AS stadium FROM nba_team t INNER JOIN nba_stadium s ON t.stadium = s.id WHERE t.championships >=?";
        var inserts = [team];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teamName = results;
            complete();
        });
    }

    /*Renders the result table after the search is completed for nba teams*/
     router.post('/searchTeamResult', function(req, res){
            
                callbackCount = 0;
                var context = {};
                var mysql = req.app.get('mysql');
                getTeamsR(res, mysql, context, req.body.championships, complete);
                function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                    res.render('searchTeamResult', context);
                }

                } 
        
    });


    /*Renders search team and player relationship page*/
 router.get('/searchTeamP', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('searchTeamP', context);
            }

        }
    });

 /*Selects rows by players with an age greater than the input value on a team founded after the inputted year*/
   function getTeamsP(res, mysql, context, player, team, complete){
        var sql = "SELECT pa.fname, pa.lname, pa.current_age, t.name, t.year_created FROM nba_player pa INNER JOIN nba_team t ON pa.current_team = t.id WHERE pa.current_age > ? AND t.year_created > ?";
        var inserts = [player, team];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teamPName = results;
            complete();
        });
    }

/*Renders the result page for players and team relationship search*/
     router.post('/searchTeamPResult', function(req, res){
            
                callbackCount = 0;
                var context = {};
                var mysql = req.app.get('mysql');
                getTeamsP(res, mysql, context, req.body.current_age, req.body.year_founded, complete);
                function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                    res.render('searchTeamPResult', context);
                }

                } 
        
    });

    /*Renders the search player and position page*/
     router.get('/searchPlayerP', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        getPosition(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('searchPlayerP', context);
            }

        }
    });

        /*Selects rows from players who place the inputted position and have at least the specifed ppg*/
        function getPlayerP(res, mysql, context, player, position, complete){
        var sql = "SELECT pa.fname, pa.lname, pa.ppg, po.title FROM nba_player pa INNER JOIN nba_player_position plp ON pa.id = plp.player_id INNER JOIN nba_position po ON po.id = plp.position_id WHERE pa.ppg >= ? AND po.id = ?";
        var inserts = [player, position];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.playerPName = results;
            complete();
        });
    }

    /*Renders the search result page for players and position relationship*/
     router.post('/searchPlayerPResult', function(req, res){
            
                callbackCount = 0;
                var context = {};
                var mysql = req.app.get('mysql');
                getPlayerP(res, mysql, context, req.body.ppg, req.body.title, complete);
                function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                    res.render('searchPlayerPResult', context);
                }

                } 
        
    }); 

/**********************SEARCH FUNCTION END LIST******************************/
/********************************************************************************/

/*Selects the corresponding player position to the inputted player id*/
 function getPos(res, mysql, context, id, complete){
        var sql = "SELECT plp.position_id FROM nba_player p INNER JOIN nba_player_position plp ON plp.player_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pos = results[0];
            complete();
        });
    }

    /*Displays an update page based on the id provided. Allows the user to update the specific row with new values.
    * Returns to main page when finished.*/

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedteam.js","updateplayer.js"];
        var mysql = req.app.get('mysql');
        getStar(res, mysql, context, req.params.id, complete);
         getPos(res, mysql, context, req.params.id, complete);
        getTeams(res, mysql, context, complete);
          getPosition(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('update-player', context);
            }

        }
    });
    


    /*Allows the addition of new players through a post request. Inserts via sql then returns to the main page*/

    router.post('/', function(req, res){

        var mysql = req.app.get('mysql');

        /*Runs through if/else to check for NULL values. statement is altered depending on the NULL value*/
        if(req.body.current_team == '' && req.body.draft_team == '')
        {
                     var sql = "INSERT INTO nba_player (fname, lname, date_drafted, current_age, ppg) VALUES (?,?,?,?,?)";
                     var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg];
        }
        else if(req.body.current_team == '')
        {
                     var sql = "INSERT INTO nba_player (fname, lname, date_drafted, current_age, ppg, draft_team) VALUES (?,?,?,?,?,?)";
                     var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.draft_team];
        }
        else if(req.body.draft_team == '')
        {
                 var sql = "INSERT INTO nba_player (fname, lname, date_drafted, current_age, ppg, current_team) VALUES (?,?,?,?,?,?)";
                     var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.current_team];
        }
        else
        {
             var sql = "INSERT INTO nba_player (fname, lname, date_drafted, current_age, ppg, current_team, draft_team) VALUES (?,?,?,?,?,?,?)";
             var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.current_team, req.body.draft_team];
        }
       

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error)
            {

                res.write(JSON.stringify(error));
                res.end();
            }
            else
            {
               
                res.redirect('/players');
            }
        });
        
    });

    /*Recieves a put request of the id of the respective entity to be updated. Pulls update parameters
    * from the post request body and passes them as sql. */

    router.put('/:id', function(req, res){
        var flag = true;
        var mysql = req.app.get('mysql');

        /*Checks the NULL values of the update statement. If NULL statement changes.*/
        if(req.body.current_team  == '' && req.body.draft_team  == '' && req.body.title == '')
        {
                 var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=NULL, draft_team=NULL WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.params.id];
                flag = false; 
            
        }
        else if(req.body.current_team  == '' && req.body.draft_team  == '' )
        {
                var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=NULL, draft_team=NULL WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.params.id];
                flag = true;
        }

        else if(req.body.draft_team  == '' && req.body.title == '')
        {
                var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=?, draft_team = NULL WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.current_team, req.params.id];
                flag = false;
        }
        else if(req.body.current_team  == '' && req.body.title == '')
        {
                 var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=NULL, draft_team=? WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.draft_team, req.params.id];
                flag = false;
        }
        else if(req.body.current_team  == '')
        {
                var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team = NULL, draft_team=? WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.draft_team, req.params.id];
                flag = true;
        }
        else if(req.body.draft_team  == '')
        {
                var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=?, draft_team=NULL WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.current_team, req.params.id];
                flag = true;
        }
        else if(req.body.title  == '')
        {
                var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=?, draft_team=? WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.current_team, req.body.draft_team, req.params.id];
                flag = false;
        }
        else
        {
                var sql = "UPDATE nba_player SET fname=?, lname=?, date_drafted=?, current_age=?, ppg=?, current_team=?, draft_team=? WHERE id=?";
                var inserts = [req.body.fname, req.body.lname, req.body.date_drafted, req.body.current_age, req.body.ppg, req.body.current_team, req.body.draft_team, req.params.id];
                flag = true; 
        }
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                 /*If there is a relationship between player and position this statement is executed*/
                 if(flag == true)
                 {
                                var sql = "INSERT INTO nba_player_position (position_id, player_id) VALUES (?,?)";
                                var inserts = [req.body.title, req.params.id];
                                sql = mysql.pool.query(sql,inserts,function(error, results, fields){

                    if(error){
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                    else{
                            res.status(200);
                            res.end();
                        }

                        });
                 }
                 else
                 {
                    /*If the player-position relationship is NULL, that id is checked and removes all relationships*/
                        var sql = "DELETE FROM nba_player_position WHERE player_id = ?";
                        var inserts = [req.params.id];
                        sql = mysql.pool.query(sql,inserts,function(error, results, fields){

                    if(error){
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                    else{
                            res.status(200);
                            res.end();
                        }

                        });
                 }
                
            }
        });
    });

    /*Allows the deletion of a row based on the id in the url. Passes the id as sql to delete.*/

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM nba_player WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
