import verificate from "./Verification2.js";
import pkg from 'pg';

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

app.get('/echo/:word', (req, res) => {
    res.json({ "echo": req.params.word })
}); 

app.post('/shirt/:name', (req, res) => {

    const { name } = req.params;
    const { type } = req.body; // req.body.type
    res.send({
        shirt: `test ${type} and has the type  ${name}`,
    })
});

app.get('/ticket/:id', async (req, res) => {

    /*const client = new pkg.Client({
        host: 'bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com',
        port: '5432',
        user: 'u4bj5mr4jis06pbvlw5t',
        password: 'xJzpptRJm9iXMmmuQkzr',
        database: 'bq3zrot8kwkjsoiu0e7z'
      });
    
      client.connect();
      
      client.query('SELECT ticketid FROM tickets WHERE ticketid =' + req.params.id, (err, result) => {
        res.json({"ergebnis": result.rows[0].ticketid});
        client.end();
      });*/

      let ergebnis = await verificate(req.params.id);
      res.json({"ergebnis": ergebnis});
    }); 


app.listen(PORT, () => console.log(`Listening on ${PORT}`));


