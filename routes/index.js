var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //all of our code goes here
  //insert into users (name) values ('jeff')

  var pg = require('pg');
  var conString = process.env.DATABASE_URL || "postgres://localhost/movie_club";


  //this initializes a connection pool
  //it will keep idle connections open for a (configurable) 30 seconds
  //and set a limit of 20 (also configurable)
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    //put actual sql statement here
    client.query('select * from users', [], function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.render('index', { users: result.rows });
    });
  });
});

module.exports = router;
