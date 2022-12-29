import verificate from "./Verification2.js";

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

app.get('/ticket/:id', (req, res) => {
    const result = verificate(req.params);
    res.json({ "ergebnis": result })
}); 


app.listen(PORT, () => console.log(`Listening on ${PORT}`));


