const { EvmChain } = require("@moralisweb3/common-evm-utils/lib");
const Token = require("../model/Token");

const Moralis = require("moralis").default;

const PolygonTokens = async (address, type) => {
  const logo =
    "https://myothuhtay.github.io/assets/blockchains/polygon/assets/";
  const chain = EvmChain.POLYGON;

  try {
    let tokenList = [];
    const tokenData = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });
    for (let i = 0; i < tokenData.raw.length; i++) {
      let token = await Token.findOne({
        contractAddress: tokenData.raw[i].token_address,
      });

      if (!token) {
        token = new Token({
          type: "POLYGON",
          name: tokenData.raw[i].name,
          symbol: tokenData.raw[i].symbol,
          decimals: tokenData.raw[i].decimals,
          logo: logo + tokenData.raw[i].token_address + "/logo.png",
          amount:
            +tokenData.raw[i].balance / Math.pow(10, tokenData.raw[i].decimals),
          contractAddress: tokenData.raw[i].token_address,
        });
        token = await token.save();
        tokenList.push(token);
      } else {
        token = await Token.findOneAndUpdate(
          {
            contractAddress: tokenData.raw[i].token_address,
          },
          {
            $set: {
              type: "POLYGON",
              name: tokenData.raw[i].name,
              symbol: tokenData.raw[i].symbol,
              decimals: tokenData.raw[i].decimals,
              logo: logo + tokenData.raw[i].token_address + "/logo.png",
              amount:
                +tokenData.raw[i].balance /
                Math.pow(10, tokenData.raw[i].decimals),
              contractAddress: tokenData.raw[i].token_address,
            },
          },
          { upsert: true }
        );
        tokenList.push(token);
      }
    }

    return tokenList;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = PolygonTokens;
