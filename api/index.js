var express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());
app.use(cors());
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// Get the mysql service
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reunionou'
});
// Add the credentials to access your database


// Perform a query


app.get('/', function (req, res) {
    res.send('api de reunionou');
});
app.get('/user', function (req, res) {


    // connect to mysql
    connection.connect(function (err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        }
    });

    $query = 'SELECT * from user';

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            res.send(err);
            return;
        }
        res.send(rows);
        console.log("Query succesfully executed: ", rows);
    });
    connection.end(function () {
        // The connection has been closed
    });

});
app.post("/connect", (req, res) => {
    connection.connect(function (err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        }
    });
    //let utilisateur = JSON.stringify(req.body);
    console.log(req.body);
    let utilisateur = req.body;

    $query = `SELECT * FROM user WHERE email = "${utilisateur.email}"`;

    connection.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            if (result >= 0) {
                res.status(404).send("email ou mot de passe invalide");
            } else {
                if (utilisateur.password !== result[0].mdp) {
                    res.status(404).send("email ou mot de passe invalide");
                    /*if (!bcrypt.compareSync(utilisateur.password, result[0].mdp)) {
                        res.status(404).send("email ou mot de passe invalide");*/
                } else {
                    res.status(200).send("connexion accepté");
                }
            }

        }
    })
    connection.end(function () {
        // The connection has been closed
    });
});
