const express = require("express");
const Bsc = require("../middleware/bsc");
const Eth = require("../middleware/eth");
const Polygon = require("../middleware/polygon");
const User = require("../model/users");
const coinRouter = express.Router();
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const PolygonTokens = require("../middleware/polygonTokens");
const EthToken = require("../middleware/ethTokens");
const BscTokens = require("../middleware/bsctokens");
const Btc = require("../middleware/btc");
const Ltc = require("../middleware/ltc");

const chain = EvmChain.BSC;
// const ethChain = EvmChain.ETHEREUM;
// const polygonChain = EvmChain.POLYGON;
coinRouter.get("/api/balance", async (req, res) => {
  try {
    const btcAddress = req.query.btcAddress;
    const ltcAddress = req.query.ltcAddress;
    const address = req.query.address;
    const userEmail = req.query.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const userAddress = User.updateOne(
      { email: userEmail },
      {
        $set: {
          walletAddress:[ address,btcAddress,ltcAddress]
        },
      },
      { upsert: true }
    );
    console.log((await userAddress).matchedCount);
    const BtcBalance = await Btc(btcAddress, userEmail);
    const ltcBalance = await Ltc(ltcAddress, userEmail);
    const Bscbalance = await Bsc(address, userEmail);
    const ethBalance = await Eth(address, userEmail);
    const polygonBalance = await Polygon(address, userEmail);
    // const bscToken = await BscTokens(address,"BEP-20");
    // const ethToken = await EthToken(address, "ERC-20");
    // const polygonToken = await PolygonTokens(address,"Polygon");
    res
      .status(200)
      .json({
        BtcBalance,
        ltcBalance,
        Bscbalance,
        ethBalance,
        polygonBalance,
        // bscToken,
        // ethToken,
        // polygonToken,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = coinRouter;
