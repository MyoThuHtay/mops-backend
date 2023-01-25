const axios = require("axios");
const dotenv = require("dotenv");
const Coins = require("../model/coins");
const Transactions = require("../model/Transactions");
const User = require("../model/users");
dotenv.config();

const btcUri = process.env.BTC_URI;
const Btc = async (address,userEmail) => {
  try {
    const user = await User.findOne({ userEmail });
    const userId = user._id;
    const transactions = await axios.get(`${btcUri}${address}`);
    const name = "Bitcoin";
    const symbol = "BTC";
    const decimals = "8";
    const logo =
      "https://myothuhtay.github.io/assets/blockchains/bitcoin/info/logo.png";
    const balance = transactions.data.final_balance;
    const type = "Coin";
    let coin;
    tx = transactions.data.txs
    let fromAddress = tx[0].out[0].spent == true? tx[0].out[0].addr : tx[0].out[1].addr;
    let amount = tx[0].out[0].spent == true? tx[0].out[0].value : tx[0].out[1].value;
    
    let toAddress = tx[0].out[0].spent == false? tx[0].out[0].addr : tx[0].out[1].addr;
    txs = await Transactions.findOne({txHash:tx[0].hash});
    if (!txs) {
        
      txs = new Transactions({
        coinName: name,
        blockNumber:tx[0].block_index,
        timeStamp: tx[0].time,
        txHash: tx[0].hash,
        fromAddress,
        toAddress,
        amount,
        gasPrice:tx[0].fee,

      });
      txs = await txs.save();
    }
    txs = await Transactions.findOne({txHash:tx[0].hash});
    txId = txs._id;
    coin = await Coins.findOne({ name: name });
    if (!coin) {
      coin = new Coins({
        user: userId,
        address: address,
        name,
        symbol,
        decimals,
        logo,
        amount: balance,
        type,
        transactions:txId
      });
      coin = await coin.save();
    }

    coin = await Coins.updateMany(
      { name: name },
      {
        $set: {
          user: userId,
          address: address,
          name,
          symbol,
          decimals,
          logo,
          amount: balance,
          type,
          transactions:txId
        },
      },
      { upsert: true }
    );

    coin = await Coins.findOne({ name: name });
    return coin;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = Btc;
