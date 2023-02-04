const { EvmChain } = require("@moralisweb3/common-evm-utils/lib");
const Token = require("../model/Token");
const eip55 = require('eip55')
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
    tokenData.raw.map((token) =>
      tokenList.push(
        new Token({
          type: "POLYGON",
          name: token.name,
          symbol: token.symbol,
          decimals: token.decimals,
          logo: logo + eip55.encode(token.token_address) + ".png",
          amount: token.balance / Math.pow(10, token.decimals),
          contractAddress: eip55.encode(token.token_address),
        })
      )
    );
    return tokenList;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = PolygonTokens;
