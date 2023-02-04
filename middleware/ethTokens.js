const { EvmChain } = require("@moralisweb3/common-evm-utils/lib");
const Token = require("../model/Token");

const Moralis = require("moralis").default;

const EthToken = async (address,type) => {
  const logo = "https://myothuhtay.github.io/assets/blockchains/ethereum/assets/";
  const chain = EvmChain.ETHEREUM;

  try {
    let tokenList = [];
    const tokenData = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });
    tokenData.raw.map((token) =>
      tokenList.push(
        new Token({
          type: "ERC-20",
          name: token.name,
          symbol: token.symbol,
          decimals: token.decimals,
          logo: logo + token.token_address + "/logo.png",
          amount: token.balance / Math.pow(10, token.decimals),
          contractAddress: token.token_address,
        })
      )
    );
    return tokenList;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = EthToken;
