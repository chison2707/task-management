const express = require('express');
const database = require("./config/database");
require("dotenv").config();

const routeApiV1 = require("./api/v1/routes/index.route");

const app = express()
const port = process.env.PORT;

database.connect();

routeApiV1(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})