const axios = require('axios');
const Transaction = require('./dto/transaction.dto')


module.exports = { fetchTransactions, queryTransaction, sumOfTransactions }


async function getTimestamp() {
    const lastRecord = await Transaction.findOne({}, null, { sort: { timestamp: -1 } })
    return lastRecord != undefined ? lastRecord.timestamp.toString() : "1695686400"
}

async function generateQuery() {

    const timestamp = await getTimestamp()

    console.log("fetching since  - ", timestamp);

    const query = JSON.stringify({
        query: `
    {
        withdraws(where: {timestamp_gt: "${timestamp}"}){
        from
        to
        id
        amountUSD
        timestamp
        }
    }`});


    return query
}

async function fetchTransactions() {
    while (true) {
        const query = await generateQuery()

        const headers = {
            "content-type": "application/json"
        }

        try {
            const response = await axios({
                url: process.env.GRAPH_ADDRESS,
                method: 'post',
                headers: headers,
                data: query
            })
            if (response.data.data.withdraws.length == 0) {
                console.log("db in sync with graph!");
                break
            }

            await saveTransactions(response.data)

        } catch (error) {
            console.log(error);
        }

    }

}

async function saveTransactions(data) {
    try {

        await Transaction.create(...data.data.withdraws)
        console.log("inserted - ", data.data.withdraws.length, " records!");
    } catch (error) {
        console.log(console.error());
    }
}

async function queryTransaction(limit, skip, wallet_address) {
    return await Transaction.find(wallet_address ? { to: wallet_address } : {}).skip(skip || 0).limit(limit || 5)
}

async function sumOfTransactions(wallet_address) {
    let agr_pipeline =
        [
            {
                $group: {
                    _id: "$to",
                    sum: {
                        $sum:
                            "$amountUSD"
                    }
                }
            }
        ]
    console.log(wallet_address);
    if (wallet_address) {
        agr_pipeline.push({
            $match: { _id: wallet_address }
        })
    }


    return await Transaction.aggregate(agr_pipeline)

}