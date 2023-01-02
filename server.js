import pkg from 'pg';
import { Ticketservice } from './Services/Ticketservice.js';
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

app.post('/shirt/:name', (req, res) => {

    const { name } = req.params;
    const { type } = req.body; // req.body.type
    res.send({
        shirt: `test ${type} and has the type  ${name}`,
    })
});

app.get('/api/ticket/status/:id', async (req, res) => {
    let t = new Ticketservice();  
    try {
        let result = await t.verificate(req.params.id);
        let owner = await t.getOwner(req.params.id);
        res.json({
            "ticketid": req.params.id,
            "active": result,
            "Owner": {
              "userid": owner.userid,
              "firstname": owner.firstname,
              "lastname": owner.lastname,
              "birthdate": owner.birthdate
            }
          });
    } catch (error) {
        res.json({"Error": error.message});
    }
    }); 

    app.post('/api/ticket/deactivate/:id', async (req, res) => {
        let t = new Ticketservice();  
        try {
            let result = await t.deactivateTicket(req.params.id);
            res.send({ result: result });
        } catch (error) {
            res.send({ Error: error.message });
        }
    });

    app.post('/api/ticket/activate/:id', async (req, res) => {
        let t = new Ticketservice();  
        try {
            let result = await t.activateTicket(req.params.id);
            res.send({ result: result });
        } catch (error) {
            res.send({ Error: error.message });
        }
    });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


