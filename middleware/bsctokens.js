const { EvmChain } = require("@moralisweb3/common-evm-utils/lib");
const Token = require("../model/Token");
const eip55 = require('eip55')
const Moralis = require("moralis").default;

const BscTokens = async (address) => {
  const logo =
    "https://myothuhtay.github.io/assets/blockchains/smartchain/assets/";
  const chain = EvmChain.BSC;
  try {
    let tokenList = [];
    const tokenData = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });

    tokenData.raw.map((token) =>
      tokenList.push(
        new Token({
          type: "BEP-20",
          name: token.name,
          symbol: token.symbol,
          decimals: token.decimals,
          logo: logo + token.token_address + ".png",
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

module.exports = BscTokens;
