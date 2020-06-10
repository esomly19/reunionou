const express = require('express')
const mysql = require("mysql")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


// Constants
const PORT = 3000;
const HOST = "0.0.0.0";
const SERVER = "http://docketu.iutnc.univ-lorraine.fr:19502/"

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json());
app.use(cors())



app.get('/', function (req, res) {
    res.send('api de reunionou');
});



app.get('/user', function (req, res) {


    // connect to mysql


    $query = 'SELECT * from user';

    db.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            res.send(err);
            return;
        }
        res.send(rows);
        console.log("Query succesfully executed: ", rows);
    });


});
app.post("/log", (req, res) => {

    //let utilisateur = JSON.stringify(req.body);
    console.log(req.body);
    let log = req.body;
    let date_ob = new Date();
    console.log(date_ob);
    $query = `INSERT INTO logs( navigateur, plateform, date) VALUES('${log.navigateur}', '${log.plateform}', "${date_ob}")`;

    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            if (result >= 0) {
                res.status(404).send("problème log");
            } else {

                res.status(200).send("log enregistré");
            }
        }

    });



});

app.get("/logs", (req, res) => {
    let firefox = 0;
    let Chrome = 0;


    $query = `SELECT * FROM  logs`;

    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            if (result >= 0) {
                res.status(404).send("problème log");
            } else {
                result.forEach(lm => {
                    console.log(lm.navigateur);
                    if (lm.navigateur === "Chrome") {
                        Chrome++;
                    } else {
                        firefox++;
                    }



                });
                let data = {};

                data.type = "collection";
                data.chrome = Chrome;
                data.firefox = firefox;
                res.status(200).send(data);
            }
        }

    });


});
//s'inscrire
app.post("/utilisateur", (req, res) => {

    //let utilisateur = JSON.stringify(req.body);
    console.log(req.body);
    let utilisateur = req.body;


    let query = `SELECT * FROM user where 'email' = "${utilisateur.email}" `
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            if (result > 0) {
                res.status(403).send("le compte existe déjà")
            } else {
                const salt = bcrypt.genSaltSync(4);
                const hash = bcrypt.hashSync(utilisateur.password, salt);
                let query2 = `INSERT INTO user (email,nom,prenom,mdp) VALUES ('${utilisateur.email}','${utilisateur.nom}','${utilisateur.prenom}','${hash}')`;

                db.query(query2, (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(404).send(err);
                    } else {
                        res.status(201).send("créer");
                    }
                })
            }
        }
    })

});



//se connecter 
app.post("/connect", (req, res) => {

    console.log(req.body);
    let utilisateur = req.body;

    $query = `SELECT * FROM user WHERE email = "${utilisateur.email}"`;

    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            if (result >= 0) {
                res.status(404).send("email ou mot de passe invalide");
            } else {


                if (!bcrypt.compareSync(utilisateur.password, result[0].mdp)) {
                    res.status(404).send("email ou mot de passe invalide");
                } else {

                    let e = JSON.stringify(result[0].id);
                    console.log(e);
                    res.status(200).send(e);

                }


            }


        }
    })

});



//event
app.post("/event", (req, res) => {

    //let utilisateur = JSON.stringify(req.body);

    let event = req.body;
    const salt = bcrypt.genSaltSync(4);
    const hash = bcrypt.hashSync(event.titre + event.iduser, salt);
    console.log("Date " + event.date);
    let date2 = new Date(event.date);
    date2 = date2.getUTCFullYear() + '-' +
        ('00' + (date2.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date2.getUTCDate()).slice(-2) + ' ' +
        ('00' + date2.getUTCHours()).slice(-2) + ':' +
        ('00' + date2.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date2.getUTCSeconds()).slice(-2);
    console.log(date2);
    let $query = `INSERT INTO event (titre,description,date,etat,x,y,adresse,token,iduser) VALUES ('${event.titre}','${event.description}' ,'${date2}','${event.etat}','${event.x}','${event.y}','${event.adresse}','${hash}','${event.iduser}')`;
    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {

            res.status(200).send("connexion accepté");

        }


    })

});


app.get("/events", (req, res) => {

    //let utilisateur = JSON.stringify(req.body);


    $query = `SELECT * FROM event WHERE etat =1`;
    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {

            res.status(200).send(result);

        }


    })

});

app.get("/event/:token", (req, res) => {

    let tooken = req.params.token;

    $query = `SELECT * FROM event WHERE token ="${tooken}"`;
    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {

            res.status(200).send(result[0]);

        }


    })

});

app.get("/user/:id", function (req, res) {



    let id = req.params.id;

    $query = `SELECT * from user WHERE id ="${id}" `;

    db.query($query, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {

            res.status(200).send(result[0]);

        }


    })


});


app.get("/participants/:token", function (req, res) {



    let token = req.params.token;

    $query2 = `SELECT id from event WHERE token ="${token}" `;

    db.query($query2, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            let idd = result[0].id;
            console.log(result[0].id);
            $query = `SELECT * from participe WHERE idevent ="${idd}" `;

            db.query($query, (err, result2) => {

                if (err) {
                    console.error(err);
                    res.status(404).send(err);
                } else {
                    console.log(result2);
                    res.status(200).send(result2);

                }


            })
        }

    })
});


app.post("/participe", (req, res) => {
    let token = req.body.token;
    console.log("token " + token);
    let id;
    $query2 = `SELECT id from event WHERE token ="${token}" `;

    db.query($query2, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            console.log(result[0].id);
            id = result[0].id;
            let event = req.body;

            let $query = `INSERT INTO participe (idevent,nom) VALUES ('${id}','${event.nom}')`;
            db.query($query, (err, result) => {

                if (err) {
                    console.error(err);
                    res.status(404).send(err);
                } else {

                    res.status(200).send("connexion accepté");

                }


            });
        }


    });
});

app.get("/commentaires/:token", function (req, res) {



    let token = req.params.token;

    $query2 = `SELECT id from event WHERE token ="${token}" `;

    db.query($query2, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            let idd = result[0].id;
            console.log(result[0].id);
            $query = `SELECT * from commentaires WHERE idevent ="${idd}" `;

            db.query($query, (err, result2) => {

                if (err) {
                    console.error(err);
                    res.status(404).send(err);
                } else {
                    console.log(result2);
                    res.status(200).send(result2);

                }


            })
        }

    })
});

app.post("/comment", (req, res) => {
    let token = req.body.token;
    console.log("token " + token);
    let id;
    $query2 = `SELECT id from event WHERE token ="${token}" `;

    db.query($query2, (err, result) => {

        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            console.log(result[0].id);
            id = result[0].id;
            let event = req.body;

            let $query = `INSERT INTO commentaires (idevent,nom,commentaire) VALUES ('${id}','${event.nom}','${event.commentaire}')`;
            db.query($query, (err, result) => {

                if (err) {
                    console.error(err);
                    res.status(404).send(err);
                } else {

                    res.status(200).send("connexion accepté");

                }


            });
        }


    });
});

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reunionou'
});


function startConnection() {
    console.error('CONNECTING');
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'reunionou'
    });
    console.log(db)
    db.connect(function (err) {
        if (err) {
            console.error('CONNECT FAILED', err.code);
            startConnection();
        }
        else
            console.error('CONNECTED');
    });
    db.on('error', function (err) {
        if (err.fatal)
            startConnection();
    });
}

app.listen(PORT, HOST);
console.log(`API Running on http://${HOST}:${PORT}`)