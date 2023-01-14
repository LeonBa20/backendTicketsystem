//In der server.js werden alle REST-Anfragen entgegengenommen und mithilfe der Service und Objekt-Klassen verarbeitet.
import { Ticketservice } from './Services/Ticketservice.js';
import { Userservice } from './Services/Userservice.js';
import { User } from './AllObjects/User.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.options("", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.use(express.json());

//Befehle zur Verwaltung der Ticket-Tabellen sowie Befüllung mit Testdaten
app.post('/api/ticket/createTable', async (req, res) => {
    let ts = new Ticketservice();
    await ts.createTicketTable();
    res.sendStatus(200);
});

app.post('/api/ticket/addExamples', async (req, res) => {
    let ts = new Ticketservice();
    await ts.exampleData();
    res.sendStatus(200);
});

app.delete('/api/ticket/deleteTable', async (req, res) => {
    let ts = new Ticketservice();
    await ts.deleteTable();
    res.sendStatus(200);
});

//Befehle zur Verwaltung der User-Tabellen sowie Befüllung mit Testdaten
app.post('/api/user/createTable', async (req, res) => {
    let us = new Userservice();
    await us.createUserTable();
    res.sendStatus(200);
});

app.post('/api/user/addExamples', async (req, res) => {
    let us = new Userservice();
    await us.exampleData();
    res.sendStatus(200);
});

app.delete('/api/user/deleteTable', async (req, res) => {
    let us = new Userservice();
    await us.deleteTable();
    res.sendStatus(200);
});

app.post('/api/createAllTables', async (req, res) => {
    let ts = new Ticketservice();
    let us = new Userservice();
    await us.createUserTable();
    await ts.createTicketTable();
    await us.exampleData();
    await ts.exampleData();
    res.sendStatus(200);
});

app.delete('/api/resetAllTables', async (req, res) => {
    let ts = new Ticketservice();
    let us = new Userservice();
    ts.deleteTable();
    us.deleteTable();
    await us.createUserTable();
    await ts.createTicketTable();
    await us.exampleData();
    await ts.exampleData();
    res.sendStatus(200);
});

//Prüfung der Gültigkeit eines Tickets. Handelt es sich um ein Ticket mit tagesbasierter Einlösung, wird dies dementsprechend berücksichtigt. 
app.get('/api/ticket/status/:id', async (req, res) => {
    let ts = new Ticketservice();
    try {
        let result = await ts.verificate(req.params.id);
        let owner = await ts.getOwner(req.params.id);
        res.json({
            "ticket_id": req.params.id,
            "active": result,
            "Owner": {
              "user_id": owner.user_id,
              "first_name": owner.first_name,
              "last_name": owner.last_name,
              "birthdate": owner.birthdate
            }
          });
    } catch (error) {
        res.json({"Error": error.message});
    }
    });

    //Deaktivierung eines Tickets
    app.post('/api/ticket/deactivate/:id', async (req, res) => {
        let ts = new Ticketservice();
        try {
            let result = await ts.deactivateTicket(req.params.id);
            res.send({ result: result });
        } catch (error) {
            res.send({ Error: error.message });
        }
    });

    //Aktivierung eines Tickets
    app.post('/api/ticket/activate/:id', async (req, res) => {
        let ts = new Ticketservice();
        try {
            let result = await ts.activateTicket(req.params.id);
            res.send({ result: result });
        } catch (error) {
            res.send({ Error: error.message });
        }
    });

    //Ausgabe aller Tickets eines Nutzers
    app.get('/api/ticket/allOfUser/:userid', async (req, res) => {
        let ts = new Ticketservice();
        try {
            let ticketlist = await ts.getAllTicketsOfUser(req.params.userid);
            res.json({ticketlist});
        } catch (error) {
            res.json({"Error": error.message});
        }
    });
    
    //Registrierung eines Nutzers
    app.post('/api/user/register', async (req, res) => {
        let us = new Userservice();
        if (req.body.email == null) {
            res.json({
                "email": 'fill in', 
                "password": 'fill in',
                "first_name": 'fill in', 
                "last_name": 'fill in', 
                "birthdate": 'YEAR-MONTH-DAY'
            });
        } else {
            let user = new User(null, req.body.password, req.body.email, req.body.first_name, req.body.last_name, req.body.birthdate, null, null);
            try {
                let user_email = await us.register(user);
                res.json({"Account": user_email});
            } catch(error) {
                res.json({Error: error.message});
            }
        } 
    });

    app.patch('/api/user/login', async (req, res) => {
        let us = new Userservice();
        if (req.body.email == null) {
            res.json({
                "email": 'fill in', 
                "password": 'fill in'
            });
        } else {
            try {
                let user = await us.login(req.body.email, req.body.password);
                res.json({
                    "user_id": user.user_id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "birthdate": user.birthdate
                });
            } catch (error) {
                res.send({ Error: error.message });
            }
        }
    });

    app.patch('/api/user/logout', async (req, res) => {
        let us = new Userservice();
        if (req.body.email == null) {
            res.json({
                "email": 'fill in'
            });
        } else {
            try {
                let result = await us.logout(req.body.email);
                res.send({ logout: result });
            } catch (error) {
                res.send({ Error: error.message });
            }
        }
    });

    app.delete('/api/user/delete', async (req, res) => {
        let us = new Userservice();

        if (req.body.email == null) {
            res.json({
                "email": 'fill in'
            });
        } else {
            try {
                let result = await us.deleteUser(req.body.email);
                res.send({ logout: result });
            } catch (error) {
                res.send({ Error: error.message });
            }
        }
    });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


