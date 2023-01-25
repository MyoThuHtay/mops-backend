const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const ltcUri = process.env.LTC_URI;
const LtcBalance = async (address) => {

    try {
        const transations = await axios.get(`${ltcUri}${address}`);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
    return transations.data;

        
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = LtcBalance;