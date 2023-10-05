const { default: axios } = require('axios');
const https = require('axios');


function fetchWithdrawls() {
    const query = JSON.stringify({
        query: `
    {
        withdraws{
        from
        to
        id
        amountUSD
        }
    }
`,
    });

    const headers = {
        "content-type": "application/json"
    }

    const options = {
        "method": "POST",
        "headers": headers,
        "body": query
    }

    fetch(process.env.GRAPH_ADDRESS, options).then((data) => {
        console.log(data);
    }, (err) => {
        console.log(err);
    })

}