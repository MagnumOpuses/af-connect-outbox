const express = require('express');
const bodyParser = require('body-parser');

const config = require('./lib/config');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(`AF-connnect-outbox is alive`));


app.listen(config.port, () => console.log(`AF-connect outbox is running on port ${config.port}`));

