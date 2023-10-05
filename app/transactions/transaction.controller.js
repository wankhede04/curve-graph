const express = require('express');
const router = express.Router();
const transactionService = require('./transactions.service');
const { HttpStatusCode } = require('axios');

module.exports = router;

router.get('/all', fetchTransactions);

router.get('/sum', sumOfTransactions);


function fetchTransactions(req, res, next) {

    let wallet_address = req.query.wallet_address
    let limit = req.params['limit']
    let skip = req.params['skip']

    return transactionService.queryTransaction(limit, skip, wallet_address).then((response) => {
        return res.json({ data: response })
    }).catch((reason) => {
        return res.status(HttpStatusCode.InternalServerError).send(reason)
    })
}

function sumOfTransactions(req, res, next) {

    let wallet_address = req.query.wallet_address

    return transactionService.sumOfTransactions(wallet_address).then((response) => {
        return res.json({ data: response })
    }).catch((reason) => {
        console.log(reason);
        return res.status(HttpStatusCode.InternalServerError).send(reason)
    })

}


function getLastTransactionInDb() {

}
