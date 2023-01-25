const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const transations = express.Router();
dotenv.config();
transations.get('/api/btcTransations', async (req, res) => {
    const address = req.query.address;
    
    const btcTransationsUri = process.env.BTC_URI;
    try {
        const transations = await axios.get(`${btcTransationsUri}${address}`);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
    res.status(200).json(transations.data);
        
    } catch (error) {
        res.status(400).send(error.message);
    }

})

transations.get('/api/ltcTransations', async (req, res) => {
    const address = req.query.address;
    
    const ltcTransationsUri = process.env.LTC_URI;
    try {
        const transations = await axios.get(`${ltcTransationsUri}${address}`);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
    res.status(200).json(transations.data);
        
    } catch (error) {
        res.status(400).send(error.message);
    }

})

transations.get('/api/transations', async (req, res) => {
    const contractaddress = req.query.contractaddress;
    const address = req.query.address;
    const apikey = process.env.BSC_SCAN_API_KEY;
    const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&page=1&offset=latest&startblock=0&endblock=999999999&sort=asc&apikey=${apikey}`;
    try {
        const transations = await axios.get(uri);
        console.log(transations.status);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
        res.status(200).json(transations.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

transations.get('/api/ethereumTransations', async (req, res) => {
    const address = req.query.address;
    const apikey = process.env.ETHER_SCAN_API;
    const ethTransationsUri = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`;
    try {
        const transations = await axios.get(ethTransationsUri);
        //console.log(transations.status);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
        res.status(200).json(transations.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
transations.get('/api/ethTransations', async (req, res) => {
    const contractaddress = req.query.contractaddress;
    const address = req.query.address;
    const apikey = process.env.ETHER_SCAN_API;
    const uri = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&page=1&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=${apikey}`;
    try {
        const transations = await axios.get(uri);
        console.log(transations.status);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
        res.status(200).json(transations.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

transations.get('/api/maticTransations', async (req, res) => {
    const address = req.query.address;
    const apikey = process.env.POLYGON_SCAN_API;
    const maticTransationsUri = `https://api.polygon.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`;
    try {
        const transations = await axios.get(maticTransationsUri);
        //console.log(transations.status);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
        res.status(200).json(transations.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
transations.get('/api/polygonTransations', async (req, res) => {
    const contractaddress = req.query.contractaddress;
    const address = req.query.address;
    const apikey = process.env.POLYGON_SCAN_API;
    const uri = `https://api.polygon.com/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&page=1&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=${apikey}`;
    try {
        const transations = await axios.get(uri);
        console.log(transations.status);
        if (transations.status !== 200) {
            res.status(transations.status).json({
                message: "error"
            });
        }
        res.status(200).json(transations.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = transations;
