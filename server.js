import pkg from 'pg';
import { Ticketservice } from './Services/Ticketservice.js';
import { Userservice } from './Services/Userservice.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.options("", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

app.use(express.json());

app.post('/api/ticket/createTable', async (req, res) => {
    let ts = new Ticketservice();
    await ts.createTicketTable();
    res.send(200);
});

app.post('/api/ticket/addExamples', async (req, res) => {
    let ts = new Ticketservice();
    await ts.exampleData();
    res.send(200);
});

app.delete('/api/ticket/deleteTable', async (req, res) => {
    let ts = new Ticketservice();
    await ts.deleteTable();
    res.send(200);
});

app.post('/api/user/createTable', async (req, res) => {
    let us = new Userservice();
    await us.createUserTable();
    res.send(200);
});

app.post('/api/user/addExamples', async (req, res) => {
    let us = new Userservice();
    await us.exampleData();
    res.send(200);
});

app.delete('/api/user/deleteTable', async (req, res) => {
    let us = new Userservice();
    await us.deleteTable();
    res.send(200);
});

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

    app.post('/api/ticket/deactivate/:id', async (req, res) => {
        let ts = new Ticketservice();
        try {
            let result = await ts.deactivateTicket(req.params.id);
            res.send({ result: result });
        } catch (error) {
            res.send({ Error: error.message });
        }
    });

    app.post('/api/ticket/activate/:id', async (req, res) => {
        let ts = new Ticketservice();
        try {
            let result = await ts.activateTicket(req.params.id);
            res.send({ result: result });
        } catch (error) {
            res.send({ Error: error.message });
        }
    });

    app.get('/api/ticket/allOfUser/:userid', async (req, res) => {
        let ts = new Ticketservice();
        ts.getAllTicketsOfUser(req.params.userid);
        res.send({Ergebnis: "ja"});
        /*try {
            let result = await ts.verificate(req.params.userid);
            let owner = await ts.getOwner(req.params.userid);
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
        }*/
        });

    //User erstellen POST
    //Passwort prüfen GET
    //User delete DELETE
    //Tickets abfragen?
    //Event Tabelle und abfragen?

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


