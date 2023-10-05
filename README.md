# Curve subgraph analysis

## Description
The goal of this Assignment is to assess your  full stack development skills
​
You be required to create a frontend and a backend that fetches the latest transactions (from 26th of September till date ) via graphql with [Curve Finance Ethereum | Graph Explorer (thegraph.com)](https://thegraph.com/explorer/subgraphs/GAGwGKc4ArNKKq9eFTcwgd1UGymvqhTier9Npqo1YvZB?view=Playground&chain=mainnet)  
​
1) you can use the withdraws (from the subgraph )to extract information like `from` , `to` , `id` and `amount` and display it on the frontend, transactions should be updated real time ideally but you can use a cron script for every 3 mins to update the FE with the latest transactions. When the user clicks on `id` it should  redirect to the etherscan page containing the transaction (for eg [Ethereum Transaction Hash (Txhash) Details | Etherscan](https://etherscan.io/tx/0x171d521dccb4b2e75787120ee9ad31ca7dbee23e7da139abe712c99966c7d9ba) )
​
2) the backend will also have another endpoint which calculates `total amount` withdrawn by any wallet address (from 26th of September till date) and there should be a section or a page in the frontend where any user can use this feature
​
The UI design is up to you and what you think will look good and the tech stack can be rest api , websockets or trpc (what ever you think is the best solution). DB and any other requirements is up to you