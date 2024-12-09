const express = require('express');
const database = require("./config/database");
require("dotenv").config();
const bodyParser = require('body-parser');

const routeApiV1 = require("./api/v1/routes/index.route");

const app = express()
const port = process.env.PORT;

database.connect();

// parse application/json
app.use(bodyParser.json())

routeApiV1(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})