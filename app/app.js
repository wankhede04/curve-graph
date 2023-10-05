const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cron = require('node-cron');

app.use(bodyParser.json());

app.use('/v1', require('./transactions/transaction.controller'));

const port = process.env.PORT


cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});


app.listen(port, function () {
    console.log('Server listening on port ' + port);
});