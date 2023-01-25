const axios = require('axios');
const dotenv = require('dotenv');
const Coins = require('../model/coins');
dotenv.config();

const btcUri = process.env.BTC_URI;
const BtcBalance = async (address) => {

    try {
        const transations = await axios.get(`${btcUri}${address}`);
        if (transations.status == 200) {
            const name = "Bitcoin";
            const symbol = "BTC";
            const decimals = "18";
            const logo = 'https://myothuhtay.github.io/assets/blockchains/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png';
            const balance = transations.final_balance;
            const type = "Coin";
            let coin ;
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
                    //tokens: token.raw,
        
                });
            coin = await coin.save();
            }
    
            coin = await Coins.updateMany({ name: name }, {
                $set: {
                    user: userId,
                    address: address,
                    name,
                    symbol,
                    decimals,
                    logo,
                    amount: balance,
                    type,
                    //tokens: token.raw,
                },
            }, { upsert: true });
            
            coin = await Coins.findOne({ name: name });
            return coin;
        }
    return transations.data;

        
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = BtcBalance;