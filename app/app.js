const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cron = require('node-cron');
const { fetchTransactions } = require('./transactions/transactions.service');

app.use(bodyParser.json());

app.use('/v1', require('./transactions/transaction.controller'));

const port = process.env.PORT

cron.schedule('*/3 * * * *', () => {
    console.log('started fetching data!');
    fetchTransactions()
});

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});