const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = process.env

mongoose.connect(config.MONGO_URL, { user: config.MONGO_USER, pass: config.MONGO_PASS }).then(() => {
    console.log("connected to mongo!");
})

const schema = new Schema({
    from: String,
    to: String,
    id: String,
    amountUSD: {
        type: Number,
        set: v => Number.parseFloat(v)
    },
    timestamp: {
        type: Number,
        set: v => Number.parseInt(v)
    }

});


const Transactions = mongoose.model('Transaction', schema);

module.exports = Transactions;