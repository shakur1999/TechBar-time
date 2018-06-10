const express = require('express');
const mysql = require('mysql');
const bodyParser  = require("body-parser");
const app = express();

// App configs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/local"));

// MySql connections
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'shakurahmed',
  database : 'TechBar' 
});

// Restful routes
app.get("/", (req, res) => {
        res.render("home.ejs");
});

app.get("/support", (req, res) => {
    connection.query('SELECT * FROM newUsers', (err, result) => {
     // make sure to scrub input data (req.body.username) to protect against sql injection
     if(err) throw err; //sql injections 
     res.redirect(result, "/supporteng");     
    });
});
    

app.post("/support", (req,res) => {
 var person = {name: req.body.username, description : req.body.subject};
     // make sure to scrub input data (req.body.username) to protect against sql injection
    connection.query('SELECT * FROM users', function(err, results){
        if(err) throw err;
          console.log(results);
          
    connection.query('INSERT INTO newUsers SET ?', person, (err, result) => {
    res.redirect({result : userList}, "/supporteng");
    })
 })
}) 


app.get("*", function(req, res) {
    res.send("There is a TYPO in your routing!!!");
})

app.listen(8080, function() {
 console.log("TB WebApp is up and running on 8080");
})